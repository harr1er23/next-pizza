import { Story, StoryItem } from "@prisma/client"
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./constants";

export type IStory = Story & {
    items: StoryItem[];
}

export const getAll = async () => {
    return (await axiosInstance.get<IStory[]>(ApiRoutes.STORIES)).data
}