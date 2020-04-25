import UserApi from "./UserApi";

const base = "/users";

export default {
    async getUsersApi(){
        return await UserApi().get(base);
    },
    async getUserApi(username){
        return await UserApi().get(base + '/' + username);
    },
    async saveApi(user){
        return await UserApi().post(base, user);
    },
    async deleteApi(id){
        return await UserApi().delete(base + '/' + id)
    },
    async updateApi(user){
        return await UserApi().put(base, user);
    },
    async uploadCsvApi(file){
        let formData = new FormData();
        formData.append('file', file);
        return await UserApi().post(base + '/import', formData);
    }
    /*
    async getStatutTicketApi(){
        return await Api().get(base + '/statuts');
    },
    async getTypeTicketApi(){
        return await Api().get(base + '/types',{ headers: authHeader() });
    },
    async getTicketsApi(){
        return await Api().get(base,{ headers: authHeader() });
    },
    async addTicketApi(ticket){
        return await Api().post(base,ticket,{ headers: authHeader() });
    },
    async deleteTicketApi(id){
        return await Api().delete(base + '/' + id,{ headers: authHeader() });
    },
    async updateTicketApi(ticket){
        return await Api().put(base,ticket,{ headers: authHeader() });
    },
    async getTicket(id){
        return await Api().get(base + '/' + id,{ headers: authHeader() });
    },
    async searchTicketApi(searchTerm){
        return await Api().get(base + '/search/' + searchTerm,{ headers: authHeader() });
    },
    async uploadCsvApi(file) {
        let formData = new FormData();
        formData.append('file', file);
        return await Api().post(base + '/upload', formData,{ headers: authHeader() });
    }*/
}

