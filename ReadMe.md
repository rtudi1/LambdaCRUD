# Project Documentation: Serverless Project Development Phases

## Table of Contents
1. [Introduction](#introduction)
2. [Phase 1: Infrastructure Creation on AWS](#phase-1-infrastructure-creation-on-aws)
   2.1. [Objective](#21-objective)
   2.2. [Steps](#22-steps)
3. [Phase 2: Develop Lambda Microservice CRUD Rest API Business Logic with AWS SDK](#phase-2-develop-lambda-microservice-crud-rest-api-business-logic-with-aws-sdk)
   3.1. [Objective](#31-objective)
   3.2. [Steps](#32-steps)
4. [Conclusion](#conclusion)

---

## 1. Introduction

This project documentation outlines the development phases for a serverless application on Amazon Web Services (AWS). The project focuses on creating a RESTful API using AWS services such as API Gateway, Lambda Functions, and DynamoDB. The development process involves two main phases: infrastructure creation and microservice business logic development.

---

## 2. Phase 1: Infrastructure Creation on AWS

### 2.1. Objective

The goal of this phase is to set up the foundational infrastructure required for the serverless application on AWS. This includes creating an API Gateway, Lambda Functions, and a DynamoDB table. While automation with AWS Cloud Development Kit (CDK) will be covered in later sections, this phase will guide you through manual creation using AWS Management Console or AWS Command Line Interface (CLI).

### 2.2. Steps

1. **API Gateway Creation:**
   - Log in to the AWS Management Console.
   - Navigate to the API Gateway service.
   - Create a new API.
   - Define resources, methods, and integration points.

2. **Lambda Function Creation:**
   - Access the AWS Lambda service from the console.
   - Create a new Lambda function.
   - Configure the function with appropriate runtime, permissions, and triggers.
   
3. **DynamoDB Table Creation:**
   - Open the DynamoDB service in the console.
   - Create a new table with desired settings.
   - Define primary keys and any additional attributes.

---

## 3. Phase 2: Develop Lambda Microservice CRUD Rest API Business Logic with AWS SDK

### 3.1. Objective

In this phase, the focus shifts to developing the business logic for the microservice using AWS SDK JavaScript v3 and adhering to ES6 standards. The primary goal is to implement CRUD (Create, Read, Update, Delete) functions within the Lambda function that interact with the DynamoDB table created in Phase 1.

### 3.2. Steps

1. **Setting Up Lambda Function:**
   - Access the AWS Lambda service from the console.
   - Select the previously created Lambda function.
   - Configure the function code inline or upload a ZIP package.
   - Add the appropriate environment variables and permissions.

2. **Implementing CRUD Functions:**
   - Use the AWS SDK JavaScript v3 to interact with AWS services.
   - Create functions for Create, Read, Update, and Delete operations.
   - Implement error handling and validation logic.
   
3. **Testing Locally:**
   - Set up a local development environment with Node.js.
   - Use tools like the AWS SDK and serverless-offline plugin for offline testing.
   
4. **Deploying Lambda Function:**
   - Package the Lambda function and its dependencies.
   - Deploy the Lambda function using the AWS CLI or CDK.
   
---

## 4. Conclusion

This project documentation has guided you through the two main phases of developing a serverless application on AWS. By following the steps outlined in Phase 1, you've created the foundational infrastructure including API Gateway, Lambda Functions, and a DynamoDB table. In Phase 2, you've developed the microservice business logic using AWS SDK JavaScript v3 and ES6 standards, enabling CRUD operations on the DynamoDB table.

By completing both phases, you've successfully built a serverless application that leverages AWS services for scalable and cost-effective deployment.
