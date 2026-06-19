import type { CategoryDto, ChangeCategoryDto, CreateCategoryDto } from "../types/category";
import api from "./axios";

export const createCategory = async (
    createCategoryDto: CreateCategoryDto
): Promise<CategoryDto> => {
    const { data } = await api.post(
        "/api/Admin/category/create",
        createCategoryDto
    );
    return data;
};

export const updateCategory = async (
    changeCategoryDto: ChangeCategoryDto
): Promise<CategoryDto> => {
    const { data } = await api.post(
        "/api/Admin/category/change",
        changeCategoryDto
    );

    return data;
};

export const deleteCategory = async (
    id: string
) => {
    await api.delete(
        `/api/Admin/category/delete/${id}`
    );
};