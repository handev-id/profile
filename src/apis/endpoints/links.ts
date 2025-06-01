import { Link } from "../models/link";
import service from "../axios";

export const linkIndexApi = (): Promise<Link[]> => {
  return service.get("/links").then((res) => res.data);
};

export const linkShowApi = (): Promise<Link[]> => {
  return service.get("/show-links").then((res) => res.data);
};

export const linkStoreApi = (data: Partial<Link>): Promise<Link> => {
  const formData = new FormData();
  formData.append("icon", (data.icon as FileList)[0]);
  formData.append("title", data.title as string);
  formData.append("description", data.description as string);
  formData.append("link", data.link as string);
  return service
    .post("/links", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const linkUpdateApi = (data: Partial<Link>): Promise<Link> => {
  const formData = new FormData();
  if (data.icon instanceof FileList) {
    formData.append("icon", data.icon[0]);
  }
  formData.append("title", data.title as string);
  formData.append("description", data.description as string);
  formData.append("link", data.link as string);
  formData.append('_method', 'PUT');
  return service
    .post("/links/" + data.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const linkDestroyApi = (id: number): Promise<Link> => {
  return service.delete("/links/" + id).then((res) => res.data);
};
