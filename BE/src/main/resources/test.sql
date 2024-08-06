-- Member (user) 데이터 삽입
INSERT INTO member (email_verified_yn, created_at, modified_at, user_id, username, password, email, profile_image_url,
                    phone, gender, provider_type, role_type)
VALUES ('Y', NOW(), NOW(), 'user1', 'User One', 'password1', 'user1@example.com', 'http://example.com/image1.jpg',
        '010-1111-1111', 'MALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user2', 'User Two', 'password2', 'user2@example.com', 'http://example.com/image2.jpg',
        '010-2222-2222', 'FEMALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user3', 'User Three', 'password3', 'user3@example.com', 'http://example.com/image3.jpg',
        '010-3333-3333', 'MALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user4', 'User Four', 'password4', 'user4@example.com', 'http://example.com/image4.jpg',
        '010-4444-4444', 'FEMALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user5', 'User Five', 'password5', 'user5@example.com', 'http://example.com/image5.jpg',
        '010-5555-5555', 'MALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user6', 'User Six', 'password6', 'user6@example.com', 'http://example.com/image6.jpg',
        '010-6666-6666', 'FEMALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user7', 'User Seven', 'password7', 'user7@example.com', 'http://example.com/image7.jpg',
        '010-7777-7777', 'MALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user8', 'User Eight', 'password8', 'user8@example.com', 'http://example.com/image8.jpg',
        '010-8888-8888', 'FEMALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user9', 'User Nine', 'password9', 'user9@example.com', 'http://example.com/image9.jpg',
        '010-9999-9999', 'MALE', 'GOOGLE', 'USER'),
       ('Y', NOW(), NOW(), 'user10', 'User Ten', 'password10', 'user10@example.com', 'http://example.com/image10.jpg',
        '010-1010-1010', 'FEMALE', 'GOOGLE', 'USER');

-- Trainer 정보 삽입
INSERT INTO trainer_info (user_id, profile_description)
VALUES ((SELECT user_seq FROM member WHERE user_id = 'localuser'), 'Profile for User One'),
       ((SELECT user_seq FROM member WHERE user_id = 'user2'), 'Profile for User Two'),
       ((SELECT user_seq FROM member WHERE user_id = 'user3'), 'Profile for User Three');

-- User_info 데이터 삽입
INSERT INTO user_info (agree_to_receive, user_id, exercise_level, birth_date)
VALUES (1, (SELECT user_seq FROM member WHERE user_id = 'localuser'), 'BEGINNER', '1991-01-01'),
       (1, (SELECT user_seq FROM member WHERE user_id = 'user2'), 'INTERMEDIATE', '1992-02-02'),
       (1, (SELECT user_seq FROM member WHERE user_id = 'user3'), 'ADVANCED', '1993-03-03'),
       (1, (SELECT user_seq FROM member WHERE user_id = 'user4'), 'BEGINNER', '1994-04-04'),
       (1, (SELECT user_seq FROM member WHERE user_id = 'user5'), 'BEGINNER', '1995-05-05'),
       (1, (SELECT user_seq FROM member WHERE user_id = 'user8'), 'BEGINNER', '1996-06-06'),
       (1, (SELECT user_seq FROM member WHERE user_id = 'user9'), 'BEGINNER', '1997-07-07');

-- Body_info 데이터 삽입
INSERT INTO body_info (height, weight, user_info_id)
VALUES (175.5, 70.0,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser'))),
       (165.0, 55.0,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2'))),
       (180.0, 80.0,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user8'))),
       (170.0, 60.0,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user9'))),
       (160.0, 50.0,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user5')));

-- Goal 데이터 삽입
INSERT INTO goal (trainer_info_id, training_program_id, user_info_id, goal_type)
VALUES ((SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser')), NULL,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser')),
        'MUSCLE_GAIN'),
       ((SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2')), NULL,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2')),
        'WEIGHT_LOSS'),
       ((SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user3')), NULL,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user3')),
        'HEALTH_IMPROVEMENT'),
       ((SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser')), NULL,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user4')),
        'FLEXIBILITY_IMPROVEMENT'),
       ((SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2')), NULL,
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user5')),
        'BODY_PROFILE');

-- Gym 데이터 삽입 (유니크 제약 조건을 고려하여 수정)
INSERT INTO gym (trainer_info_id, user_info_id, address, gym_phone, name)
VALUES ((SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser')),
        (SELECT id FROM user_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser')),
        '123 Main St', '010-1234-5678', 'Gym One');


-- -- Comment 데이터 삽입
-- INSERT INTO comment (user_seq, content)
-- VALUES ((SELECT user_seq FROM member WHERE user_id = 'localuser'), 'Great workout!'),
--        ((SELECT user_seq FROM member WHERE user_id = 'user2'), 'Feeling strong!'),
--        ((SELECT user_seq FROM member WHERE user_id = 'user3'), 'Loved the session!'),
--        ((SELECT user_seq FROM member WHERE user_id = 'user4'), 'Challenging but fun!'),
--        ((SELECT user_seq FROM member WHERE user_id = 'user5'), 'Can’t wait for the next one!');

-- Meal 데이터 삽입
INSERT INTO meal (date, comment_id, created_at, modified_at, user_seq, content, title, meal_type)
VALUES ('2023-08-01', NULL, NOW(), NOW(),
        (SELECT user_seq FROM member WHERE user_id = 'user5'), 'Chicken Salad', 'Healthy Lunch', 'LUNCH'),
       ('2023-08-02', (SELECT comment_id FROM comment WHERE content = 'Feeling strong!'), NOW(), NOW(),
        (SELECT user_seq FROM member WHERE user_id = 'user8'), 'Steak', 'Dinner Feast', 'DINNER'),
       ('2023-08-03', NULL, NOW(), NOW(),
        (SELECT user_seq FROM member WHERE user_id = 'user9'), 'Oatmeal', 'Morning Fuel', 'BREAKFAST'),
       ('2023-08-04', (SELECT comment_id FROM comment WHERE content = 'Challenging but fun!'), NOW(), NOW(),
        (SELECT user_seq FROM member WHERE user_id = 'user4'), 'Pasta', 'Carb Loading', 'LUNCH'),
       ('2023-08-05', (SELECT comment_id FROM comment WHERE content = 'Can’t wait for the next one!'), NOW(), NOW(),
        (SELECT user_seq FROM member WHERE user_id = 'user10'), 'Smoothie', 'Post-Workout Drink', 'DINNER');

-- Qualification 데이터 삽입
INSERT INTO qualification (start_date, end_date, trainer_info_id, content, description, category)
VALUES ('2020-01-01', '2021-01-01',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser')),
        'Certification A', 'Certified Personal Trainer', 'CERTIFICATION'),
       ('2019-01-01', '2020-01-01',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2')), 'Award B',
        'Best Trainer Award', 'AWARD'),
       ('2018-01-01', '2019-01-01',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user3')),
        'Education C', 'Fitness Science Degree', 'EDUCATION'),
       ('2017-01-01', '2018-01-01',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser')),
        'Certification D', 'Nutrition Specialist', 'CERTIFICATION'),
       ('2016-01-01', '2017-01-01',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2')), 'Award E',
        'Community Leader Award', 'AWARD');

-- S3Image 데이터 삽입
INSERT INTO s3image (file_size, qualification_id, trainer_program_id, upload_date, url, content_type, file_name)
VALUES (1024, (SELECT id FROM qualification WHERE content = 'Certification A'), NULL, NOW(),
        'http://example.com/image1.jpg', 'image/jpeg', 'cert_a.jpg'),
       (2048, (SELECT id FROM qualification WHERE content = 'Award B'), NULL, NOW(), 'http://example.com/image2.jpg',
        'image/jpeg', 'award_b.jpg'),
       (512, (SELECT id FROM qualification WHERE content = 'Education C'), NULL, NOW(), 'http://example.com/image3.jpg',
        'image/jpeg', 'edu_c.jpg'),
       (1024, (SELECT id FROM qualification WHERE content = 'Certification D'), NULL, NOW(),
        'http://example.com/image4.jpg', 'image/jpeg', 'cert_d.jpg'),
       (2048, (SELECT id FROM qualification WHERE content = 'Award E'), NULL, NOW(), 'http://example.com/image5.jpg',
        'image/jpeg', 'award_e.jpg');

-- Schedule 데이터 삽입
INSERT INTO schedule (end_time, lesson_yn, schedule_date, start_time, member_seq, trainer_seq, content, title)
VALUES ('12:00:00', 'Y', CURRENT_DATE, '10:00:00', (SELECT user_seq FROM member WHERE user_id = 'user4'),
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 'Morning Workout', 'Leg Day'),
       ('14:00:00', 'Y', CURRENT_DATE, '12:00:00', (SELECT user_seq FROM member WHERE user_id = 'user5'),
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 'Afternoon Session', 'Upper Body'),
       ('16:00:00', 'Y', CURRENT_DATE, '14:00:00', (SELECT user_seq FROM member WHERE user_id = 'user6'),
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 'Evening Workout', 'Cardio'),
       ('18:00:00', 'Y', CURRENT_DATE, '16:00:00', (SELECT user_seq FROM member WHERE user_id = 'user7'),
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 'Late Session', 'Core'),
       ('20:00:00', 'Y', '2024-08-07', '18:00:00', (SELECT user_seq FROM member WHERE user_id = 'user8'),
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 'Night Training', 'Full Body');

-- Training_program 데이터 삽입
INSERT INTO training_program (trainer_info_id, description, title)
VALUES (1,
        'Full Body Workout', 'Program One'),
       (2,
        'Weight Loss Program', 'Program Two'),
       (3,
        'Muscle Gain Program', 'Program Three'),
       (1,
        'Flexibility Improvement', 'Program Four'),
       (1,
        'Stamina Boost', 'Program Five');

-- Ticket 데이터 삽입
INSERT INTO ticket (end_point, member_seq, remaining_cnt, total_cnt, trainer_seq, training_program_id, memo)
VALUES ('2024-12-31', (SELECT user_seq FROM member WHERE user_id = 'user5'), 5, 10,
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 1, 'Monthly Pass'),
       ('2024-12-31', (SELECT user_seq FROM member WHERE user_id = 'user6'), 8, 10,
        (SELECT user_seq FROM member WHERE user_id = 'user2'), 2, 'Weekly Pass'),
       ('2024-12-31', (SELECT user_seq FROM member WHERE user_id = 'user7'), 3, 10,
        (SELECT user_seq FROM member WHERE user_id = 'user3'), 3, 'Yearly Pass'),
       ('2024-12-31', (SELECT user_seq FROM member WHERE user_id = 'user8'), 7, 10,
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 1, 'Monthly Pass'),
       ('2024-12-31', (SELECT user_seq FROM member WHERE user_id = 'user9'), 2, 10,
        (SELECT user_seq FROM member WHERE user_id = 'localuser'), 2, 'Weekly Pass');

-- Trainer_schedule 데이터 삽입
INSERT INTO trainer_schedule (day_of_week, end_time, start_time, trainer_info_id)
VALUES (1, '18:00:00', '08:00:00',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser'))),
       (2, '18:00:00', '08:00:00',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2'))),
       (3, '18:00:00', '08:00:00',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user3'))),
       (4, '18:00:00', '08:00:00',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'localuser'))),
       (5, '18:00:00', '08:00:00',
        (SELECT id FROM trainer_info WHERE user_id = (SELECT user_seq FROM member WHERE user_id = 'user2')));


-- User_refresh_token 데이터 삽입
INSERT INTO user_refresh_token (user_id, refresh_token)
VALUES ('user1', 'refresh_token_1'),
       ('user2', 'refresh_token_2'),
       ('user3', 'refresh_token_3'),
       ('user4', 'refresh_token_4'),
       ('user5', 'refresh_token_5');

-- Routine 데이터 삽입
INSERT INTO routine (repetition, schedule_id, weight, weight_name)
VALUES (10, 1, 50, 'Squat'),
       (12, 2, 60, 'Bench Press'),
       (15, 3, 40, 'Deadlift'),
       (8, 4, 70, 'Overhead Press'),
       (20, 5, 30, 'Bicep Curl');