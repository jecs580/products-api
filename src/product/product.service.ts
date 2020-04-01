import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
@Injectable()
export class ProductService {
    // Metodos para manejo de datos en Mongo (ORM)
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products;
    }
    async retrieveProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findById(productID);
        return product;
    }
    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO);
        return await product.save();
    }
    async updateProduct(productID:string, createProductDTO:CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productID,createProductDTO,{new:true});
        return updatedProduct;

     }
    async deleteProduct(productID:string):Promise<Product> {
        const deletedProduct= await this.productModel.findByIdAndDelete(productID);
        return deletedProduct;
     }

}
