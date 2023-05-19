# 포팅 메뉴얼

# 🗂️ 개요

## 1. 프로젝트 사용 도구

형상 관리 : Gitlab

배포 환경 : EC2, Docker

CI/CD : Jenkins

## 2. 외부 서비스

- Google Social Login
- AWS S3 

## 3. git.ignore 처리 핵심 키

: 중괄호’{ }’ 안에 내용들은 외부 노출X

### React : .env (최상단 위치)

```bash
REACT_APP_KAKAOPAY_IMP=imp{고유번호}
REACT_APP_API_OAUTH2_BASE_URL={}
REACT_APP_API_BASE_URL={}
REACT_APP_API_AUTH_BASE_URL={}
REACT_APP_API_USER_BASE_URL={}
REACT_APP_GOOGLE_AUTH_URL=https://{}/oauth2/authorization/google
```

### Node.js : .env (최상단 위치)

```bash
COOKIE_SECRET={}
MONGO_ID={}
MONGO_PASSWORD={}
REDIS_HOST={}
REDIS_PORT=
REDIS_USERNAME={}
REDIS_PASSWORD={}
```

### Springboot : (\src\main\resources 위치)

- auth-service : application.yml, application-oauth.yml
- user-service : application.yml, application-local.yml, application-prod.yml
- ranking-service : application.yml


- application.yml(auth-service)

```bash
server:
  port: 8080

spring:
  application:
    name: auth-service
  profiles:
    active: prod # yml setting that I want to use -> local/ prod
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${api_gateway_url}:3306/{}?serverTimezone=UTC&characterEncoding=UTF-8&useSSL=true
    username: {}
    password: {}
    hikari:
      pool-name: jpa-hikari-pool
      maximum-pool-size: 5
      jdbc-url: ${spring.datasource.url}
      username: ${spring.datasource.username}
      password: ${spring.datasource.password}
      driver-class-name: ${spring.datasource.driver-class-name}
      data-source-properties:
        rewriteBatchedStatements: true


  jpa:
    generate-ddl: false
    hibernate:
      ddl-auto: update
    show-sql: true
    database: mysql
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        hbm2ddl.import_files_sql_extractor: org.hibernate.tool.hbm2ddl.MultipleLinesSqlCommandExtractor
        current_session_context_class: org.springframework.orm.hibernate5.SpringSessionContext
        default_batch_fetch_size: ${chunkSize:100}
        jdbc.batch_size: 20
        order_inserts: true
        order_updates: true
        format_sql: true

jwt:
  secret: {}
  access-token-expiration: 7200000 # 2hours (2 * 60 * 60 * 1000 ms)
  refresh-token-expiration: 604800000 # 1week (7 * 24 * 60 * 60 * 1000 ms)

logging:
  level:
    org:
      springframework:
        security=DEBUG:

```

- application-local.yml(auth-service)
```bash
spring:
  config:
    activate:
      on-profile: local
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: {}
            client-secret: {}
            redirectUri: http://${api_gateway_url}:8080/login/oauth2/code/google
            scope:
              - profile

api_gateway_url: localhost
```


- application-oauth.yml(auth-service)

```bash
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: {}
            client-secret: {}
            redirectUri: https://${api_gateway_url}/login/oauth2/code/google
            scope:
              - profile

```

- application.yml(user-service)

```bash
    spring:
    profiles:
        active: prod # 기본으로 쓸 프로파일

    application:
        name: user-service

    http:
        multipart:
        maxFileSize: 50MB
        maxRequestSize: 50MB

    mvc:
        pathmatch:
        matching-strategy: ant_path_matcher

    jpa:
        generate-ddl: true
        hibernate:
        ddl-auto: update
        show-sql: true
        database: mysql
        properties:
        hibernate:
            dialect: org.hibernate.dialect.MySQL8Dialect
            hbm2ddl.import_files_sql_extractor: org.hibernate.tool.hbm2ddl.MultipleLinesSqlCommandExtractor
            current_session_context_class: org.springframework.orm.hibernate5.SpringSessionContext
            default_batch_fetch_size: ${chunkSize:100}
            jdbc.batch_size: 20
            order_inserts: true
            order_updates: true
            format_sql: true

    redis:
        host: {}
        port: 6379
        password: {}

    data:
        mongodb:
        host: {}
        port: 27017
        database: {}
        username: {}
        password: {}
        authentication-database: admin


    server:
    port: 8081

    sd:
    url: http://{}/ml_api
```

- application-prod.yml(user-service)

```bash
    api_gateway_url: {}

    spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://${api_gateway_url}:3306/{}?serverTimezone=UTC&characterEncoding=UTF-8&useSSL=true
        username: {}
        password: {}
        hikari:
        pool-name: jpa-hikari-pool
        maximum-pool-size: 10
        jdbc-url: ${spring.datasource.url}
        username: ${spring.datasource.username}
        password: ${spring.datasource.password}
        driver-class-name: ${spring.datasource.driver-class-name}
        data-source-properties:
            rewriteBatchedStatements: true
```

- application-local.yml(user-service)

```bash
api_gateway_url: localhost

spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${api_gateway_url}:3306/{}?serverTimezone=UTC&characterEncoding=UTF-8&useSSL=true
    username: {}
    password: {}
    hikari:
      pool-name: jpa-hikari-pool
      maximum-pool-size: 5
      jdbc-url: ${spring.datasource.url}
      username: ${spring.datasource.username}
      password: ${spring.datasource.password}
      driver-class-name: ${spring.datasource.driver-class-name}
      data-source-properties:
        rewriteBatchedStatements: true
api_gateway_url: localhost

spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${api_gateway_url}:3306/{}?serverTimezone=UTC&characterEncoding=UTF-8&useSSL=true
    username: {}
    password: {}
    hikari:
      pool-name: jpa-hikari-pool
      maximum-pool-size: 5
      jdbc-url: ${spring.datasource.url}
      username: ${spring.datasource.username}
      password: ${spring.datasource.password}
      driver-class-name: ${spring.datasource.driver-class-name}
      data-source-properties:
        rewriteBatchedStatements: true

```



- application.yml(ranking-service)
```bash
api_gateway_url: {}

server:
  port: 8083

spring:
  application:
    name: ranking-service
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher

  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${api_gateway_url}:3306/{}?serverTimezone=UTC&characterEncoding=UTF-8&useSSL=true
    username: {}
    password: {}
    hikari:
      pool-name: jpa-hikari-pool
      maximum-pool-size: 10
      jdbc-url: ${spring.datasource.url}
      username: ${spring.datasource.username}
      password: ${spring.datasource.password}
      driver-class-name: ${spring.datasource.driver-class-name}
      data-source-properties:
        rewriteBatchedStatements: true

  jpa:
    generate-ddl: false
    hibernate:
      ddl-auto: update
    show-sql: true
    database: mysql
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        hbm2ddl.import_files_sql_extractor: org.hibernate.tool.hbm2ddl.MultipleLinesSqlCommandExtractor
        current_session_context_class: org.springframework.orm.hibernate5.SpringSessionContext
        default_batch_fetch_size: ${chunkSize:100}
        jdbc.batch_size: 20
        order_inserts: true
        order_updates: true
        format_sql: true



  redis:
    host: {}
    port: 6379
    password: b106b106

  data:
    mongodb:
      host: {}
      port: 27017
      database: {}
      username: {}
      password: {}
      authentication-database: admin

  batch:
    job:
      enabled: false

sd:
  url: http://{}/ml_api

```


## 4. 로컬 환경에서 실행

> Git 에서 Clone 이후에 로컬에서 실행하는 방법에 대하여 서술합니다.
>
> 1. 깃에서 클론용 주소를 복사합니다.
>    ![Untitled](/assets/Untitled.png)
>
> 1. git Bash (미설치시 구글링 후 설치)를 통해 클론합니다.
>    ![Untitled 1](/assets/Untitled%201.png)

### 1) Front: React

![Untitled 2](https://i.imgur.com/QzS553P.png)

1. git bash로 실행하기
   1. `npm i`
      ![Untitled 3](https://i.imgur.com/9aelig6.png)
   2. `npm start`
      ![Untitled 4](https://i.imgur.com/PsAmJrd.png)
   3. 이후 [`http://localhost:3000/`](http://localhost:3000/login) 으로 Front 가 실행됩니다.
      ![Untitled 5](https://i.imgur.com/LK0payS.png)
   4. 로컬 환경에서 Front 구동 완료
      ![Untitled 6](https://mygemini.s3.ap-northeast-2.amazonaws.com/%EC%BA%A1%EC%B2%98.PNG)
2. VS Code로 실행

   위와 동일한 코드를 VScode의 터미널 창에서 작성합니다.
   ![Untitled 7](https://i.imgur.com/vv38uug.png)

### 2) Stable-Diffusion: FlastApi

쉽게 실행하기
1. Run start.bat
- start.bat을 실행시키십시오.
- Batch 파일에서 알아서 launch -> pip install -> 실행까지 한번에 진행됩니다.
터미널에서 실행하기
1. 환경 변수 세팅
- python -m venv venv
- source venv/Script/activate
- pip install -r requirement.txt
- pip install -r requirement_version.txt
- python launch.py
2. Run python
- python main.py



### 3) Back: Spring Boot

1. git bash/cmd로 실행하기
   1. cd /project/경로/
   2. ./gradlew build
   3. cd build/libs
   4. java -jar 'jar파일명.jar’

2. InteliJ로 실행하기

   1. build.gradle - as Project로 열기
      ![Untitled 13](https://i.imgur.com/fphB5pD.png)

   2. Project Structure - Project Settings - Project SDK: JDK 17 확인
      ![Untitled 14](https://i.imgur.com/APOtrxQ.png)

   3. Settings - Build, Execution, Deployment - Gradle - Gradle JVM : JDK 11 확인
      ![Untitled 15](https://i.imgur.com/9M2XQod.png)

   4. 어플리케이션 실행 (Alt + Shift + F10)
      ![Untitled 16](https://i.imgur.com/wiaHIoi.png)

### 4) Back: Node js

1. git bash로 실행하기
   1. `npm i`
      ![Untitled 3](https://i.imgur.com/9aelig6.png)
   2. `npm start`
      ![Untitled 4](https://i.imgur.com/PsAmJrd.png)

2. VS Code로 실행

   위와 동일한 코드를 VScode의 터미널 창에서 작성합니다.
   ![Untitled 7](https://i.imgur.com/vv38uug.png)


# 💾 배포환경 설치

: EC2 내부 ssh 접속

## 1. Docker 설치

```bash
# Docker 설치하기
## 이전 Docker 있으면 삭제
sudo apt-get remove docker docker-engine docker.io containerd runcCopy

## Docker 권한 설정
curl -fsSL https://get.docker.com/ | sudo sh
sudo usermod -aG docker $USER
newgrp docker

# Docker Compose 설치
sudo apt-get update
sudo apt-get install docker-compose-plugin

## 설치 확인
docker compose version
```

## 2. Docker-compose설정(배포환경 일괄구축)

### 1) Nginx 컨테이너

1. nginx 설정
```bash
upstream websocket {
    server socket-service:5000;
}

server {
     listen 80;
     listen [::]:80;
     server_name mygemini.co.kr www.mygemini.co.kr;

    #  location /.well-known/acme-challenge/ {
    #          allow all;
    #          root /var/www/certbot;
    #  }  
    # ssl 인증서 발급용

    location / {
        proxy_pass http://client:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
        return 301 https://mygemini.co.kr$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name mygemini.co.kr www.mygemini.co.kr;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/mygemini.co.kr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mygemini.co.kr/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    if ($host = 'www.mygemini.co.kr') {
        return 301 https://mygemini.co.kr$request_uri;
    }

    location / {
        proxy_pass http://client:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
    }

    location /auth/validate {
        internal;
        proxy_pass http://auth-service:8080/auth/validate;
        proxy_pass_request_body off;
        proxy_set_header Content-Length "";
        proxy_set_header X-Original-URI $request_uri;
        proxy_set_header Authorization $http_authorization;
    }

    location /auth {
        proxy_pass http://auth-service:8080/auth;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
    }

    location /oauth2 {
        proxy_pass http://auth-service:8080/oauth2;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
    }

    location /login/ {
        proxy_pass http://auth-service:8080/login/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
    }
    
    location /user-service/profile/enroll {
        proxy_pass http://user-service:8081/user-service/profile/enroll;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
    }

    location /user-service/complete {
        proxy_pass http://user-service:8081/user-service/complete;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
    }

    location /alarm-service/subscribe {
        proxy_pass http://alarm-service:8082/alarm-service/subscribe;
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding off;

    }
    
    location /user-service {
        auth_request /auth/validate;
        auth_request_set $username $upstream_http_x_username;
        proxy_pass http://user-service:8081/user-service;
        proxy_set_header X-Username $username;
    }

    location /socket {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header Host $host;
        proxy_pass https://websocket/socket;
    }

    location /node {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass https://websocket/node;
    }

}
```
2. Dockerfile
```bash
FROM nginx:alpine

COPY nginx-conf/default.conf /etc/nginx/conf.d/default.conf
```
3. compose 설정
```bash
version: '3'
services:
  nginx:
    container_name: nginx
    image: bshello25/gemini:nginx
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt 
      - ./data/certbot/www:/var/www/certbot
    ports:
      - 80:80  # http
      - 443:443 # https
    networks:
      - {service명}
```
4. 인증서 발급
```bash
  certbot:
    container_name: certbot
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt 
      - ./data/certbot/www:/var/www/certbot
```

### 2) DataBase 설치

1. MysqlDB 컨테이너 설치
- compose 설정
```bash
  mysql-user:   # user-service db
    image: mysql:8.0
    container_name: mysql-user
    ports:
      - 3306:3306 # HOST:CONTAINER
    environment:
      MYSQL_ROOT_PASSWORD: {}
      MYSQL_DATABASE: {}
      MYSQL_USER: {}
      MYSQL_PASSWORD: {}
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - ./mysql/data:/var/lib/mysql
    networks:
      - {service명}

  mysql-auth: # auth-service db
    image: mysql:8.0
    container_name: mysql-auth
    ports:
      - 3307:3306 # HOST:CONTAINER
    environment:
      MYSQL_ROOT_PASSWORD: {}
      MYSQL_DATABASE: {}
      MYSQL_USER: {}
      MYSQL_PASSWORD: {}
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - ./mysql-auth/data:/var/lib/mysql
    networks:
      - {service명}
```
- 권한 부여

```bash
mysql -u root -p > pw 입력하면 db 접속

grant all privileges on 'DB명'.* to 'user명'@'%';
```

2. MongoDB 컨테이너 설치
- compose 설정
```bash
  mongodb:
    image: mongo
    container_name: mongodb
    restart: unless-stopped
    ports:
      - 27017:27017
    volumes:
      - ./mongodb:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME={}
      - MONGO_INITDB_ROOT_PASSWORD={}
      - MONGO_INITDB_DATABASE={}
```
3. Redis 컨테이너 설치
- compose 설정
```bash
redis:
    image: redis:latest
    container_name: redis
    hostname: redis
    restart: unless-stopped
    ports:
      - 6379:6379
    volumes:
      - ./redis_data:/data
      - ./conf/redis.conf:/usr/local/conf/redis.conf
    command: redis-server /usr/local/conf/redis.conf --requirepass {} --port 6379
    networks:
      - {service}
```
### Nginx 및 DB 일괄 업데이트
```bash
Docker-compose -f docker-compose-env.yml down --rmi all
Docker-compose -f docker-compose-env.yml up -d
```

### SD 배포하기

1. gpu 자원을 이용해야하는 특성상 도커환경은 부적합
2. ec2 내부에 직접 실행
3. nginx의 로드밸런싱을 이용해 애플리케이션 scale-out 구현
- dockerfile
    ```bash
    FROM nginx:alpine

    COPY nginx-conf/default.conf /etc/nginx/conf.d/default.conf
- nginx conf

    ```bash
    server {
    listen  80;
    server_name 13.124.20.123;


    location / {
        proxy_pass http://ml-app;
    }
    }

    upstream ml-app {

    least_conn;

    server 13.124.20.123:7860;
    server 13.124.20.123:7861;
    server 13.124.20.123:7862;
    server 13.124.20.123:7864;
    server 13.124.20.123:7865;
    server 13.124.20.123:7866;
    }

### CI/CD 구성 파일

- Front-Nginx_conf
    ```bash
    server {
     listen 3000;

     location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html$is_args$args;
        }
    }
    ```
- Dockerfile-Front
  ```bash
    FROM nginx:alpine

    COPY build/ /usr/share/nginx/html/
    COPY client-conf/default.conf /etc/nginx/conf.d/default.conf
  ```
- Dockerfile-{Springboot}
  ```bash
    FROM openjdk:11-slim
    WORKDIR /usr/src/app

    ARG JAR_FILE=./build/libs/*-SNAPSHOT.jar
    COPY ${JAR_FILE} app.jar
    CMD ["java","-jar","app.jar"]
  ```
- Dockerfile-{node}
  ```bash
    FROM node:16-alpine

    WORKDIR /usr/src/app

    RUN npm i bcrypt

    COPY . .

    CMD [ "npm", "start" ]

  ```

### Jenkins 자동배포

- jenkins file
  ```bash
    pipeline {
        agent any

        tools {
            nodejs "node"
            gradle "gradle"
        }

        environment {
            DOCKER_REGISTRY = "{}"
            CLIENT_IMAGE_TAG = "client"
            AUTH_SERVICE_IMAGE_TAG = "auth-service"
            USER_SERVICE_IMAGE_TAG = "user-service"
            RANKING_SERVICE_IMAGE_TAG = "ranking-service"
            SOCKET_SERVICE_IMAGE_TAG = "socket-service"
            DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        }

        stages {

            stage('dockerLogin') {
                steps {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
            stage('build') {
                parallel {
                    stage('client build') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "gemini-front/**"
                            }
                        }
                        steps {
                            dir('gemini-front') {
                                sh 'npm install'
                                sh 'echo -e "REACT_APP_KAKAOPAY_IMP=\'${REACT_APP_KAKAOPAY_IMP}\'\nREACT_APP_API_OAUTH2_BASE_URL=\'${REACT_APP_API_OAUTH2_BASE_URL}\'\nREACT_APP_GOOGLE_AUTH_URL=\'${REACT_APP_GOOGLE_AUTH_URL}\'\nREACT_APP_TWITTER_AUTH_URL=\'${REACT_APP_TWITTER_AUTH_URL}\'\nREACT_APP_API_AUTH_BASE_URL=\'${REACT_APP_API_AUTH_BASE_URL}\'\nREACT_APP_API_USER_BASE_URL=\'${REACT_APP_API_USER_BASE_URL}\'\nREACT_APP_API_BASE_URL=\'${REACT_APP_API_BASE_URL}\'" > .env.local'
                                sh 'CI=false npm run build'
                                sh 'docker build -t ${DOCKER_REGISTRY}:${CLIENT_IMAGE_TAG} .'
                                sh 'docker push ${DOCKER_REGISTRY}:${CLIENT_IMAGE_TAG}'
                            }
                        }
                        post {
                            success {
                                echo 'client build succeeded'
                            }
                            failure {
                                echo 'client build failed'
                            }
                        }
                    }

                    stage('auth-service build') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "auth-service/**"
                            }
                        }
                        steps {
                            dir('auth-service') {
                                sh 'chmod +x ./gradlew'
                                sh './gradlew clean build'
                                sh 'docker build -t ${DOCKER_REGISTRY}:${AUTH_SERVICE_IMAGE_TAG} .'
                                sh 'docker push ${DOCKER_REGISTRY}:${AUTH_SERVICE_IMAGE_TAG}'
                            }
                        }
                        post {
                            success {
                                echo 'auth-service build succeeded'
                            }
                            failure {
                                echo 'auth-service build failed'
                            }
                        }
                    }

                    stage('user-service build') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "user-service/**"
                            }
                        }
                        steps {
                            dir('user-service') {
                                sh 'chmod +x ./gradlew'
                                sh './gradlew clean build'
                                sh 'docker build -t ${DOCKER_REGISTRY}:${USER_SERVICE_IMAGE_TAG} .'
                                sh 'docker push ${DOCKER_REGISTRY}:${USER_SERVICE_IMAGE_TAG}'
                            }
                        }
                        post {
                            success {
                                echo 'user-service build succeeded'
                            }
                            failure {
                                echo 'user-service build failed'
                            }
                        }
                    }

                    stage('ranking-service build') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "ranking-service/**"
                            }
                        }
                        steps {
                            dir('ranking-service') {
                                sh 'chmod +x ./gradlew'
                                sh './gradlew clean build'
                                sh 'docker build -t ${DOCKER_REGISTRY}:${RANKING_SERVICE_IMAGE_TAG} .'
                                sh 'docker push ${DOCKER_REGISTRY}:${RANKING_SERVICE_IMAGE_TAG}'
                            }
                        }
                        post {
                            success {
                                echo 'ranking-service build succeeded'
                            }
                            failure {
                                echo 'ranking-service build failed'
                            }
                        }
                    }

                    stage('socket-service build') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "socket-service/**"
                            }
                        }
                        steps {
                            dir('socket-service') {
                                sh 'npm install'
                                sh 'echo -e "COOKIE_SECRET=\'${COOKIE_SECRET}\'\nCOOKIE_SECRET=\'${COOKIE_SECRET}\'\nMONGO_ID=\'${MONGO_ID}\'\nMONGO_PASSWORD=\'${MONGO_PASSWORD}\'\nREDIS_HOST=\'${REDIS_HOST}\'\nREDIS_PORT=\'${REDIS_PORT}\'\nREDIS_USERNAME=\'${REDIS_USERNAME}\'\nREDIS_PASSWORD=\'${REDIS_PASSWORD}\'" > .env'
                                sh 'docker build -t ${DOCKER_REGISTRY}:${SOCKET_SERVICE_IMAGE_TAG} .'
                                sh 'docker push ${DOCKER_REGISTRY}:${SOCKET_SERVICE_IMAGE_TAG}'
                            }
                        }
                        post {
                            success {
                                echo 'socket-service build succeeded'
                            }
                            failure {
                                echo 'socket-service build failed'
                            }
                        }
                    }

                }
            }
            stage('deploy') {
                parallel {
                    stage('replace client container') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "gemini-front/**"
                            }
                        }
                        steps {
                            script {
                                sshagent(credentials: ['ssh']) {
                                    sh """
                                        if ssh -o StrictHostKeyChecking=no ubuntu@{} docker container ls -a | grep -q ${CLIENT_IMAGE_TAG}; then
                                            ssh -o StrictHostKeyChecking=no ubuntu@{} docker container stop ${CLIENT_IMAGE_TAG}
                                        fi
                                        ssh -o StrictHostKeyChecking=no ubuntu@{} docker run -p 3000:3000 --name ${CLIENT_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${CLIENT_IMAGE_TAG}
                                    """
                                }
                            }
                        }
                    }

                    stage('replace auth-service container') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "auth-service/**"
                            }
                        }
                        steps {
                            script {
                                sshagent(credentials: ['ssh']) {
                                    sh """
                                        if ssh -o StrictHostKeyChecking=no ubuntu@{} docker container ls -a | grep -q ${AUTH_SERVICE_IMAGE_TAG}; then
                                            ssh -o StrictHostKeyChecking=no ubuntu@{} docker container stop ${AUTH_SERVICE_IMAGE_TAG}
                                        fi
                                        ssh -o StrictHostKeyChecking=no ubuntu@{} docker run -p 8080:8080 --name ${AUTH_SERVICE_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${AUTH_SERVICE_IMAGE_TAG}
                                    """
                                }
                            }
                        }
                    }

                    stage('replace user-service container') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "user-service/**"
                            }
                        }
                        steps {
                            script {
                                sshagent(credentials: ['ssh']) {
                                    sh """
                                        if ssh -o StrictHostKeyChecking=no ubuntu@{} docker container ls -a | grep -q ${USER_SERVICE_IMAGE_TAG}; then
                                            ssh -o StrictHostKeyChecking=no ubuntu@{} docker container stop ${USER_SERVICE_IMAGE_TAG}
                                        fi
                                        ssh -o StrictHostKeyChecking=no ubuntu@{} docker run -p 8081:8081 --name ${USER_SERVICE_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${USER_SERVICE_IMAGE_TAG}
                                    """
                                }
                            }
                        }
                    }

                    stage('replace ranking-service container') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "ranking-service/**"
                            }
                        }
                        steps {
                            script {
                                sshagent(credentials: ['ssh']) {
                                    sh """
                                        if ssh -o StrictHostKeyChecking=no ubuntu@{} docker container ls -a | grep -q ${RANKING_SERVICE_IMAGE_TAG}; then
                                            ssh -o StrictHostKeyChecking=no ubuntu@{} docker container stop ${RANKING_SERVICE_IMAGE_TAG}
                                        fi
                                        ssh -o StrictHostKeyChecking=no ubuntu@{} docker run -p 8083:8083 --name ${RANKING_SERVICE_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${RANKING_SERVICE_IMAGE_TAG}
                                    """
                                }
                            }
                        }
                    }

                    stage('replace socket-service container') {
                        when {
                            allOf {
                                expression {
                                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                                }
                                changeset "socket-service/**"
                            }
                        }
                        steps {
                            script {
                                sshagent(credentials: ['ssh']) {
                                    sh """
                                        if ssh -o StrictHostKeyChecking=no ubuntu@{} docker container ls -a | grep -q ${SOCKET_SERVICE_IMAGE_TAG}; then
                                            ssh -o StrictHostKeyChecking=no ubuntu@{}o docker-compose -f docker-compose-socket.yml down --rmi all
                                        fi
                                        ssh -o StrictHostKeyChecking=no ubuntu@{}docker-compose -f docker-compose-socket.yml up -d
                                    """
                                }
                            }
                        }
                    }

                }
            }
        }
    }



  ```

# ✏️ 서비스 이용 방법

## 1. Google Social Login

### 1) [google developers](https://www.notion.so/47d78fe40cda4510be7159cbb41d1515) - 애플리케이션 접속

### 2) 애플리케이션 추가하기

### 3) REST API 키 확인

![Untitled 17](https://i.imgur.com/NmvpfS6.png)

### 4) Redirect URI 설정

![Untitled 18](https://i.imgur.com/fTdXHRi.png)

### 5) 동의 항목 - 받아올 개인 정보 설정

![Untitled 19](https://i.imgur.com/ZJICWRm.png)

### 6) Spring Boot Flow

<summary> <b style="font-size:18px;"> dependency </b></summary>


### auth-service

```java
dependencies {

	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-redis'
	implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
	implementation 'org.springframework.boot:spring-boot-starter-security'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-webflux'

	implementation 'org.json:json:20210307'
	implementation 'com.fasterxml.jackson.core:jackson-databind:2.13.1'

	implementation 'io.jsonwebtoken:jjwt-api:0.11.2' //
	implementation 'io.jsonwebtoken:jjwt-impl:0.11.2' //
	implementation 'io.jsonwebtoken:jjwt-jackson:0.11.2' //
//	implementation 'org.springframework.boot:spring-boot-configuration-processor' //
	annotationProcessor "org.springframework.boot:spring-boot-configuration-processor"

	compileOnly 'org.projectlombok:lombok'
	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	runtimeOnly 'com.mysql:mysql-connector-j'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testImplementation 'org.springframework.security:spring-security-test'

}
```


### user-service

```java
dependencies {

	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
	implementation 'org.springframework.boot:spring-boot-starter-data-redis'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-webflux'
	compileOnly 'org.projectlombok:lombok'
	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	runtimeOnly 'com.mysql:mysql-connector-j'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

### ranking-service

```java
dependencies {

	implementation 'org.springframework.boot:spring-boot-starter-batch'
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
	implementation 'org.springframework.boot:spring-boot-starter-data-redis-reactive'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	compileOnly 'org.projectlombok:lombok'
	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	runtimeOnly 'com.mysql:mysql-connector-j'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testImplementation 'io.projectreactor:reactor-test'
	testImplementation 'org.springframework.batch:spring-batch-test'
}
```

