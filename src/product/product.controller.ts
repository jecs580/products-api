import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';
@Controller('product') // Endpoint para productos
export class ProductController {
    constructor(private productService: ProductService) { }
    @Post('/create') // Endpoint para /products/create
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Producto creado exitosamente',
            product
        });
    }
    @Get('/') // Endpoint para productos
    async getProducts(@Res() res): Promise<Product[]> {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        });
    }
    @Get('/:productID') // Cuando colocamos ":" significa que es un parametro de entrada desde el cliente
    async retriveProduct(@Res() res, @Param('productID') productID): Promise<Product> {
        // Con Param enviamos el nombre del parametro que colocamos en el decorador Get
        const product = await this.productService.retrieveProduct(productID);
        if (!product) {
            throw new NotFoundException('El producto no existe');
            // Devuelve un 404 con el mensaje que colocamos dentro de NotFoundException
        }
        return res.status(HttpStatus.OK).json({
            product
        });
    }
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
        const productDeleted= await this.productService.deleteProduct(productID);
        if(!productDeleted){
            throw new NotFoundException('El producto no existe');
        }
        return res.status(HttpStatus.OK).json({
            message:'¡Producto Eliminado exitosamente!',
            productDeleted
        });
    }
    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO:CreateProductDTO, @Query('productID') productID): Promise<Product>{
        const updatedProduct = await this.productService.updateProduct(productID,createProductDTO);
        if(!updatedProduct) throw new NotFoundException('¡El producto a actualizar no existe!');
        return res.status(HttpStatus.OK).json({
            message:'¡Producto actualizado exitosamente!',
            updatedProduct
        });
    }
}
