FROM openjdk:17-slim

WORKDIR /app

COPY ./build/libs/BE-0.0.1-SNAPSHOT.jar /app/BE-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "/app/BE-0.0.1-SNAPSHOT.jar"]