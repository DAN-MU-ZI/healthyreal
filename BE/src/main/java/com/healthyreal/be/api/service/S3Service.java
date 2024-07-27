package com.healthyreal.be.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.IOException;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3Service {
	private final AmazonS3Client amazonS3Client;

	@Value("${cloud.aws.credentials.bucket}")
	private String bucket;

	public String saveImage(MultipartFile file, String entityName) {
		String originalFilename = getOriginalFilename(file);
		ObjectMetadata metadata = createObjectMetadata(file);
		String s3Path = generateS3Path(entityName, originalFilename);

		try (InputStream inputStream = file.getInputStream()) {
			uploadToS3(s3Path, inputStream, metadata);
			return getFileUrl(s3Path);
		} catch (IOException e) {
			handleError(e);
			return null;
		}
	}

	private String getOriginalFilename(MultipartFile file) {
		return file.getOriginalFilename();
	}

	private ObjectMetadata createObjectMetadata(MultipartFile file) {
		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		metadata.setContentType(file.getContentType());
		return metadata;
	}

	private String generateS3Path(String entityName, String originalFilename) {
		// 엔티티 이름에 따라 경로를 생성합니다.
		return entityName + "/" + originalFilename; // 예: "user/filename.jpg"
	}

	private void uploadToS3(String path, InputStream inputStream, ObjectMetadata metadata) {
		amazonS3Client.putObject(
			new PutObjectRequest(bucket, path, inputStream, metadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
	}

	private String getFileUrl(String path) {
		return amazonS3Client.getUrl(bucket, path).toString();
	}

	private void handleError(IOException e) {
		System.err.println("Error occurred while saving image: " + e.getMessage());
	}
}
