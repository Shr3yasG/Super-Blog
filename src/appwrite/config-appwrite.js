import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({title,slug,content,fimg,status,userId}){
    try {
        return await this.databases.createDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          slug,
          {
            title,
            content,
            fimg,
            status,
            userId,
          }
        )
    } catch (error) {
        console.log("Appwrite service :: logout :: error", error);
    }
  }

  async updatePost(slug, {title,content,fimg,status}){
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          fimg,
          status,
        }
      )
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true; 
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      return false; 
    }
    
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async getPosts(queries = [Query.equal('status'),("active")]){
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
      )
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
      return false
    }
  }

  //file upload services
  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
      return false
    } 
  }

  async deleteFile(fileId){
    try {
      return await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
      return false
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }
}
const service = new Service(); 
export default service;
