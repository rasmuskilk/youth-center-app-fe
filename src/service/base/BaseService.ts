import httpClient from "../../utils/http-client";

export class BaseService<TEntity> {

    constructor(private path: string) {
    }

    async get(id: string, token: string): Promise<TEntity> {
        const response = await httpClient.get(`/${this.path}/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        return response.data as TEntity;
    }

    async getAll(token: string): Promise<TEntity[]> {
        const response = await httpClient.get(`/${this.path}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        return response.data as TEntity[];
    }

    async add(entity: TEntity, token: string): Promise<TEntity> {
        const response = await httpClient.post(`/${this.path}`, entity,
            {
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
        return response.data as TEntity;
    }

    async remove(id: string, token: string): Promise<void> {
        await httpClient.delete(`/${this.path}/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
    }

    async update(entity: TEntity, id: string, token: string): Promise<void> {
        await httpClient.put(`/${this.path}/${id}`, entity, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
    }
}
