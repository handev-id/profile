import service from "../axios";
import { Project } from "../models/project";

export const projectIndexApi = (): Promise<Project[]> => {
  return service.get("/projects").then((res) => res.data);
};

export const projectIndexShowApi = (): Promise<Project[]> => {
  return service.get("/show-projects").then((res) => res.data);
};

export const projectStoreApi = (
  project: Partial<Project>
): Promise<Project> => {
  const data = new FormData();
  data.append("title", project.title as string);
  data.append("description", project.description as string);
  data.append("link", project.link as string);

  for (const [i, image] of project.images?.entries() || []) {
    if (image instanceof File) {
      data.append(`images[${i}]`, image);
      continue;
    }
  }

  return service
    .post("/projects", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const projectUpdateApi = (
  project: Partial<Project>
): Promise<Project> => {
  const data = new FormData();
  data.append("title", project.title as string);
  data.append("description", project.description as string);
  data.append("link", project.link as string);

  for (const [i, image] of project.images?.entries() || []) {
    if (image instanceof File) {
      data.append(`images[${i}]`, image);
      continue;
    }
  }

  data.append("_method", "PUT");

  return service
    .post("/projects/" + project.id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const projectDestroyApi = (id: number): Promise<Project> => {
  return service.delete("/projects/" + id).then((res) => res.data);
};

export const projectShowApi = (id: number): Promise<Project> => {
  return service.get("/projects/" + id).then((res) => res.data);
};

export const projectDestroyImageApi = ({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<{ images: string[] }> => {
  return service
    .delete("/projects/" + id + "/images/" + name)
    .then((res) => res.data);
};
