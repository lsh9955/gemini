stages:
  - libs
  - build
  - deploy

npm:
  stage: libs
  only:
    - develop
  cache:
    paths:
      - gemini-front/node_modules
  script:
    - cd gemini-front
    - npm install

client:
  stage: build
  environment: react-framework-build
  only:
    - develop
  cache:
    paths:
      - gemini-front/build
      - gemini-front/node_modules
  needs: ["npm"]
  when: on_success
  script:
    - cd gemini-front
    - CI=false npm run build
    - docker build -t bshello25/gemini:client .
    - docker push bshello25/gemini:client
  artifacts:
    paths:
      - $CI_PROJECT_DIR/gemini-front/build

client:on_failure:
  stage: build
  only:
    - develop
  cache:
    paths:
      - gemini-front/build
      - gemini-front/node_modules
  needs: ["npm"]
  when: on_failure
  script:
    - echo "client build failed"

deploy-job/client:preparing_for_replace:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  only:
    - develop
  needs: ["client"]
  allow_failure: true
  when: on_success
  script:
    - docker container stop client && docker container rm client

deploy-job/client:replace_docker_container:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  only:
    - develop
  needs: ["deploy-job/client:preparing_for_replace"]
  when: on_success
  script:
    - docker run -p 3000:3000 --name client --network gemini -d bshello25/gemini:client

auth-service:
  stage: build
  only:
    - develop
  script:
    - cd auth-service
    - chmod +x gradlew
    - ./gradlew clean build
    - docker build -t bshello25/gemini:auth-service .
    - docker push bshello25/gemini:auth-service

auth-service:on_failure:
  stage: build
  only:
    - develop
  when: on_failure
  script:
    - echo "auth-service build failed"

deploy-job/auth-service:preparing_for_replace:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  only:
    - develop
  needs: ["auth-service"]
  allow_failure: true
  when: on_success
  script:
    - docker container stop auth-service && docker container rm auth-service

deploy-job/auth-service:replace_docker_container:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  only:
    - develop
  needs: ["deploy-job/auth-service:preparing_for_replace"]
  # allow_failure: true
  when: on_success
  script:
    - docker run -p 8080:8080 --name auth-service --network gemini -d bshello25/gemini:auth-service

user-service:
  stage: build
  only:
    - develop
  script:
    - cd user-service
    - chmod +x gradlew
    - ./gradlew clean build
    - docker build -t bshello25/gemini:user-service .
    - docker push bshello25/gemini:user-service

user-service:on_failure:
  stage: build
  only:
    - develop
  when: on_failure
  script:
    - echo "user-service build failed"

deploy-job/user-service:preparing_for_replace:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  only:
    - develop
  needs: ["user-service"]
  allow_failure: true
  when: on_success
  script:
    - docker container stop user-service && docker container rm user-service

deploy-job/user-service:replace_docker_container:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  only:
    - develop
  needs: ["deploy-job/user-service:preparing_for_replace"]
  # allow_failure: true
  when: on_success
  script:
    - docker run -p 8081:8081 --name user-service --network gemini -d bshello25/gemini:user-service