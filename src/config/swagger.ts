import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export interface SwaggerDocumentationConfigModel {
    title: string;
    description: string;
    version: string;
    tags: string
}

const apimodel: SwaggerDocumentationConfigModel = {
    title: process.env.SWAGGER_TITLE || 'API DOcumentation',
    description: process.env.SWAGGER_Description || 'API documentation description',
    version: process.env.SWAGGER_version || 'v1',
    tags: process.env.SWAGGER_tags || 'api tags'
}

export class SwaggerDocumentationConfig {
    public static init(app: INestApplication) {
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