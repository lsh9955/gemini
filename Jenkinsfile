pipeline {
    agent any

	tools {
		nodejs "node"
		gradle "gradle"
	}

    environment {
        DOCKER_REGISTRY = "bshello25/gemini"
        CLIENT_IMAGE_TAG = "client"
        AUTH_SERVICE_IMAGE_TAG = "auth-service"
        USER_SERVICE_IMAGE_TAG = "user-service"
		RANKING_SERVICE_IMAGE_TAG = "ranking-service"
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
									if ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container ls -a | grep -q ${CLIENT_IMAGE_TAG}; then
										ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container stop ${CLIENT_IMAGE_TAG}
									fi
									ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker run -p 3000:3000 --name ${CLIENT_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${CLIENT_IMAGE_TAG}
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
									if ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container ls -a | grep -q ${AUTH_SERVICE_IMAGE_TAG}; then
										ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container stop ${AUTH_SERVICE_IMAGE_TAG}
									fi
									ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker run -p 8080:8080 --name ${AUTH_SERVICE_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${AUTH_SERVICE_IMAGE_TAG}
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
									if ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container ls -a | grep -q ${USER_SERVICE_IMAGE_TAG}; then
										ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container stop ${USER_SERVICE_IMAGE_TAG}
									fi
									ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker run -p 8081:8081 --name ${USER_SERVICE_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${USER_SERVICE_IMAGE_TAG}
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
									if ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container ls -a | grep -q ${RANKING_SERVICE_IMAGE_TAG}; then
										ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker container stop ${RANKING_SERVICE_IMAGE_TAG}
									fi
									ssh -o StrictHostKeyChecking=no ubuntu@k8b106.p.ssafy.io docker run -p 8083:8083 --name ${RANKING_SERVICE_IMAGE_TAG} --network gemini -d --rm ${DOCKER_REGISTRY}:${RANKING_SERVICE_IMAGE_TAG}
								"""
            				}
        				}
                    }
                }

            }
        }
  	}
}