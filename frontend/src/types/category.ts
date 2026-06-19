export interface CreateCategoryDto{
     name:string;
     description:string;
     interviewPrompt:string;
     evaluationPrompt:string;
     defaultDifficulty:number;
     maxQuestions:number;
     isActive:boolean;
}
export interface CategoryDto{
     id:string;
     name:string;
     description:string;
     interviewPrompt:string;
     evaluationPrompt:string;
     defaultDifficulty:number;
     maxQuestions:number;
     isActive:boolean;
     createdAt: Date;
}
export interface ChangeCategoryDto{
     id:string;
     name:string;
     description:string;
     interviewPrompt:string;
     evaluationPrompt:string;
     defaultDifficulty:number;
     maxQuestions:number;
     isActive:boolean;
}