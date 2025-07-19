import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "../schemas/project.schema";
import { Skill } from "../schemas/skill.schema";
import { Category } from "../schemas/category.schema";
import { Industry } from "../schemas/industry.schema";
import { Specialty } from "../schemas/specialty.schema";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Skill.name) private skillModel: Model<Skill>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Industry.name) private industryModel: Model<Industry>,
    @InjectModel(Specialty.name) private specialtyModel: Model<Specialty>,
  ) {}

  async findAll(filters?: {
    specialties: string[];
    skills: string[];
    projectType: string[];
    industries: string[];
  }, sortOptions?: {
    sortOrder: 'asc' | 'desc';
  }): Promise<any[]> {

    let mongoFilter: any = {};
    
    if (filters) {
      const skills = await this.skillModel.find().exec();
      const categories = await this.categoryModel.find().exec();
      const industries = await this.industryModel.find().exec();
      const specialties = await this.specialtyModel.find().exec();
      
      if (filters.specialties.length > 0) {
        const specialtyIds = specialties
          .filter(specialty => filters.specialties.includes(specialty.name))
          .map(specialty => specialty.id);
        if (specialtyIds.length > 0) {
          mongoFilter.specialties = { $in: specialtyIds };
        }
      }
      
      if (filters.skills.length > 0) {
        const skillIds = skills
          .filter(skill => filters.skills.includes(skill.name))
          .map(skill => skill.id);
        if (skillIds.length > 0) {
          mongoFilter.$or = [
            { skills: { $in: skillIds } },
            { 'positions.skills': { $in: skillIds } }
          ];
        }
      }
      
      if (filters.projectType.length > 0) {
        const categoryIds = categories
          .filter(category => filters.projectType.includes(category.name))
          .map(category => category.id);
        if (categoryIds.length > 0) {
          mongoFilter.category = { $in: categoryIds };
        }
      }
      
      if (filters.industries.length > 0) {
        const industryIds = industries
          .filter(industry => filters.industries.includes(industry.name))
          .map(industry => industry.id);
        if (industryIds.length > 0) {
          mongoFilter['organization.industry'] = { $in: industryIds };
        }
      }
    }
    

    let mongoSort: any = {};
    if (sortOptions && sortOptions.sortOrder) {
      const sortDirection = sortOptions.sortOrder === 'asc' ? 1 : -1;
      mongoSort['publishedAt'] = sortDirection;
    }
    
    const projects = await this.projectModel.find(mongoFilter).sort(mongoSort).exec();
    const skills = await this.skillModel.find().exec();
    const categories = await this.categoryModel.find().exec();
    const industries = await this.industryModel.find().exec();
    const specialties = await this.specialtyModel.find().exec();

    return projects.map(project => {
      const projectObj: any = project.toObject();
      

      const firstPositionSkills = projectObj.positions?.[0]?.skills || [];
      projectObj.skillNames = firstPositionSkills.map((skillId: any) => 
        skills.find((skill: any) => skill.id == skillId)?.name
      ).filter(Boolean) || [];
      
      projectObj.categoryName = categories.find((cat: any) => cat.id == projectObj.category)?.name;
      
      projectObj.industryName = industries.find((ind: any) => ind.id == projectObj.organization?.industry)?.name;
      
      projectObj.specialtyNames = projectObj.specialties?.map((specialtyId: any) => 
        specialties.find((specialty: any) => specialty.id == specialtyId)?.name
      ).filter(Boolean) || [];

      return projectObj;
    });
  }

  async findById(id: number): Promise<any> {
    const project = await this.projectModel.findOne({ id }).exec();
    if (!project) {
      return null;
    }

    const skills = await this.skillModel.find().exec();
    const categories = await this.categoryModel.find().exec();
    const industries = await this.industryModel.find().exec();
    const specialties = await this.specialtyModel.find().exec();

    const projectObj: any = project.toObject();
    
    projectObj.positions = projectObj.positions?.map((position: any) => ({
      ...position,
      skillNames: position.skills?.map((skillId: any) => 
        skills.find((skill: any) => skill.id == skillId)?.name
      ).filter(Boolean) || [],
      specialtyNames: position.specialties?.map((specialtyId: any) => 
        specialties.find((specialty: any) => specialty.id == specialtyId)?.name
      ).filter(Boolean) || []
    })) || [];

    projectObj.skillNames = projectObj.skills?.map((skillId: any) => 
      skills.find((skill: any) => skill.id == skillId)?.name
    ).filter(Boolean) || [];
    
    projectObj.specialtyNames = projectObj.specialties?.map((specialtyId: any) => 
      specialties.find((specialty: any) => specialty.id == specialtyId)?.name
    ).filter(Boolean) || [];
    
    projectObj.categoryName = categories.find((cat: any) => cat.id == projectObj.category)?.name;
    projectObj.industryName = industries.find((ind: any) => ind.id == projectObj.organization?.industry)?.name;

    return projectObj;
  }
}
