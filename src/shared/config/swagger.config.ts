import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface SwaggerDocumentationConfigModel {
    title: string;
    description: string;
    version: string;
    tags: string;
}

const apimodel: SwaggerDocumentationConfigModel = {
    title: process.env.SWAGGER_TITLE || 'API Documentation',
    description:
        process.env.SWAGGER_Description || 'API documentation description',
    version: process.env.SWAGGER_version || 'v1',
    tags: process.env.SWAGGER_tags || 'api tags',
};

const swaggerSecuritySchemeObject: SecuritySchemeObject = {
    type: 'http',
    bearerFormat: 'Bearer {token}',
    name: 'Bearer',
    scheme: 'Bearer',
};

export class SwaggerDocumentationConfig {
    public static init(app: INestApplication) {
        const options = new DocumentBuilder()
            .setTitle(apimodel.title)
            .setDescription(apimodel.description)
            .setVersion(apimodel.version)
            .addTag(apimodel.tags)
            .addBearerAuth()

            //.setBasePath('/api')
            .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api/docs', app, document, {
            //swaggerUrl: `${hostDomain}/api/docs-json`,
            explorer: true,
            swaggerOptions: {
                docExpansion: 'list',
                filter: true,
                showRequestDuration: true,
            },
        });
    }
}
