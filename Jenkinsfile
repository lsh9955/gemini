pipeline {
    agent any

	// tools {
	// 	nodejs "node"
	// 	gradle "gradle"
	// }

    environment {
        DOCKER_REGISTRY = "bshello25/gemini"
        CLIENT_IMAGE_TAG = "client"
        AUTH_SERVICE_IMAGE_TAG = "auth-service"
        USER_SERVICE_IMAGE_TAG = "user-service"
    }

    stages {

		stage('checkout') {
    		steps {
        		checkout([$class: 'GitSCM', branches: [[name: '*/develop']], 
				userRemoteConfigs: [[url: 'https://lab.ssafy.com/s08-final/S08P31B106']],
				credentials: 'gg'
				])
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
							sh 'CI=false npm run build'
							sh 'docker build -t ${DOCKER_REGISTRY}:${CLIENT_IMAGE_TAG} .'
							sh 'docker push ${DOCKER_REGISTRY}:${CLIENT_IMAGE_TAG}'
						}
					}
					post {
						always {
							dir('gemini-front') {
								junit 'reports/**/*.xml'
								archiveArtifacts 'build/**'
							}
						}
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
							sh './gradlew clean build'
							sh 'docker build -t ${DOCKER_REGISTRY}:${AUTH_SERVICE_IMAGE_TAG} .'
							sh 'docker push ${DOCKER_REGISTRY}:${AUTH_SERVICE_IMAGE_TAG}'
						}
					}
					post {
						always {
							dir('auth-service') {
								junit 'build/test-results/**/*.xml'
							}
						}
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
							sh './gradlew clean build'
							sh 'docker build -t ${DOCKER_REGISTRY}:${USER_SERVICE_IMAGE_TAG} .'
							sh 'docker push ${DOCKER_REGISTRY}:${USER_SERVICE_IMAGE_TAG}'
							sh 'docker rm '
						}
					}
					post {
						always {
							dir('user-service') {
								junit 'build/test-results/**/*.xml'
							}
						}
						success {
							echo 'user-service build succeeded'
						}
						failure {
							echo 'user-service build failed'
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
            				sshagent(['/root/.ssh/K8B106T.pem']) {
                			sh """
                    			ssh -o StrictHostKeyChecking=no -i /root/.ssh/K8B106T.pem ubuntu@k8b106.p.ssafy.io \
                    			"docker container stop client && docker container rm client"
                				docker run -p 3000:3000 --name client --network gemini -d ${DOCKER_REGISTRY}/${CLIENT_IMAGE_TAG}
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
            				sshagent(['/root/.ssh/K8B106T.pem']) {
                			sh """
                    			ssh -o StrictHostKeyChecking=no -i /root/.ssh/K8B106T.pem ubuntu@k8b106.p.ssafy.io \
                    			"docker container stop auth-service && docker container rm auth-service"
                				docker run -p 8080:8080 --name auth-service --network gemini -d ${DOCKER_REGISTRY}/${AUTH_SERVICE_IMAGE_TAG}
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
            				sshagent(['/root/.ssh/K8B106T.pem']) {
                			sh """
                    			ssh -o StrictHostKeyChecking=no -i /root/.ssh/K8B106T.pem ubuntu@k8b106.p.ssafy.io \
                    			"docker container stop user-service && docker container rm user-service"
                				docker run -p 8081:8081 --name user-service --network gemini -d ${DOCKER_REGISTRY}/${USER_SERVICE_IMAGE_TAG}
                			"""
            				}
        				}
                    }
                }
            }
        }
  	}
}