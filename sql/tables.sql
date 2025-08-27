CREATE TABLE rmi_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(256),
    forename VARCHAR(256),
    surname VARCHAR(256),
    telephone_no VARCHAR(256),
    email_address VARCHAR(256),
    password VARCHAR(256),
    admin BOOLEAN DEFAULT FALSE,
    two_phase BOOLEAN DEFAULT FALSE
);

CREATE TABLE rmi_users (
    id                        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userid                    VARCHAR(255) NOT NULL,
    forename                  VARCHAR(255) NOT NULL,
    surname                   VARCHAR(255) NOT NULL,
    telephone_no              VARCHAR(255) NOT NULL,
    email                     VARCHAR(255) NOT NULL,
    password                  VARCHAR(255) NOT NULL,
    admin_user                BOOLEAN      NOT NULL DEFAULT FALSE,
    two_phase                 BOOLEAN      NOT NULL DEFAULT FALSE,
    last_logged_in            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_inactive          BOOLEAN      NOT NULL DEFAULT FALSE,
    password_reset_requested  TIMESTAMP,
    password_reset_uuid       VARCHAR(255),
    invalid_login_attempts    INT UNSIGNED NOT NULL DEFAULT 0,
    to_be_activated           BOOLEAN,
    email_invalid             BOOLEAN      NOT NULL DEFAULT FALSE
);
INSERT INTO rmi_users(
    userid,
    forename,
    surname,
    telephone_no,
    email,
    password,
    admin_user,
    password_reset_requested,
    password_reset_uuid,
    to_be_activated
) VALUES
('graeme', 'graeme', 'burton', '01234 567890', 'graeme@moorwen.com','graeme',TRUE,NULL, NULL, NULL),
('rhianna', 'rhianna', 'clavering', '01234 567890', 'rhianna@moorwen.com','rhianna',TRUE,NULL, NULL, NULL);


