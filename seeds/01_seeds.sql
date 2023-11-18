INSERT INTO users (name, email, password)
VALUES ('Harry Shaw', 'HarryS@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
'), ('Simon Minnter', 'SimonM@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
'), ('John Smith', 'Jsmith@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 450, 2, 2, 3, 'Canada', '123 Fake Street', 'Mississauga', 'ON', 'M4A2V9', TRUE),
(1, 'Blank Corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 1000, 6, 6, 7, 'Canada', '651 Nami Road', 'Bohbatev', 'AB', 'V4S1G0', TRUE), 
(2, 'Habit Mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 730, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'NL', 'Z3A9T2', FALSE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-22', 2, 3), ('2019-01-04', '2019-02-01', 2, 2), ('2023-10-01', '2023-10-14', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 2, 1, 4, 'messages'), (2, 2, 2, 4, 'messages'), (3, 1, 3, 4, 'messages');