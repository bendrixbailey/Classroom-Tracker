DROP table if EXISTS classrooms CASCADE;

CREATE TABLE classrooms (
        id   SERIAL PRIMARY KEY NOT NULL,
        normal INT,
        yellow INT,
        max INT,
        current INT,
        name VARCHAR(30),
        floor INT,
        building VARCHAR(30)
);


INSERT INTO classrooms (normal, yellow, max, current, name, floor, building)
VALUES(50, 15, 30, 0, 2050, 2, 'EAS');

INSERT INTO classrooms (normal, yellow, max, current, name, floor, building)
VALUES(27, 8, 15, 0, 1530, 1, 'GOL');

INSERT INTO classrooms (normal, yellow, max, current, name, floor, building)
VALUES(40, 10, 20, 0, 3260, 3, 'EAS');

INSERT INTO classrooms (normal, yellow, max, current, name, floor, building)
VALUES(20, 6, 12, 0, 2550, 2, 'LIB');