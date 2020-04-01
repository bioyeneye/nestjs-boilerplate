import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export interface SwaggerDocumentationConfigModel{
    title: string;
    description: string;
    version: string;
    tags: string
}

export class SwaggerDocumentationConfig{
    public static init(app: INestApplication, apimodel: SwaggerDocumentationConfigModel){
        const options = new DocumentBuilder()
        .setTitle(apimodel.title)
        .setDescription(apimodel.description)
        .setVersion(apimodel.version)
        .addTag(apimodel.tags)
        .build();
    
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api', app, document);
    }
}