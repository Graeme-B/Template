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


-- Create platforms table
CREATE TABLE rmi_platforms (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(256) NOT NULL
);

-- Populate platforms table
INSERT INTO rmi_platforms (platform_name) VALUES 
('facebook'),
('x'),
('instagram'),
('linkedin');

-- Create and populate the reminder frequencies table
CREATE TABLE rmi_reminder_frequencies(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    frequency VARCHAR(256) NOT NULL
);
INSERT INTO rmi_reminder_frequencies(frequency) VALUES
('Daily'),
('Weekly)';

/*
Field Name		Description									Purpose/Used For
user_id			Unique ID linking this profile to a specific user				Ensures brand data is tied to the correct account
business_name		Name of the user’s business							Included in prompts or calendar UI
industry		General business type (e.g. bakery, recruitment agency)				Adds context to content and tone
products_or_service	Short description of what they offer						Helps AI write accurate, relevant captions
target_audience		Who they are speaking to (e.g. mums, young students, dog lovers)		Shapes tone, references and level of formality
reminder_frequency	Daily, Weekly, or Custom reminders						Used to trigger notifications or emails

brand_tone		Chosen tone (e.g. playful, professional, cheeky)				Directly affects the AI’s writing style
writing_style		Format preference (e.g. short + punchy, story-led)				Adjusts AI structure, length, and formatting
voice_dos		List of things to include (e.g. emojis, first-person voice, humour)		Keeps output aligned with brand personality
voice_donts		List of things to avoid (e.g. jargon, sounding salesy)				Prevents off-brand or generic-sounding captions
example_phrases		Optional go-to lines, taglines or expressions					Can be echoed in posts to stay familiar to followers
key_messages		Core values or themes (e.g. “Made from scratch”, “Judgement-free support”	Injects brand meaning or values into AI content
content_goals		What they want their content to do (e.g. Educate, Drive Sales, Build Trust)	Informs AI prompt tone and call-to-action
platform_focus		Main platform(s) (e.g. Instagram, Facebook, LinkedIn)				Adjusts caption format and style
saved_favourites	Links to a table of past saved content						Lets user re-use or revisit past captions

Lists of target audiences?
*/

-- Create rmi_profile table
CREATE TABLE rmi_profile (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    user_id              INT NOT NULL,
    business_name        VARCHAR(256),
    industry             VARCHAR(256),
    products_or_services VARCHAR(256),
    target_audience      VARCHAR(256),
    reminder_frequency	 INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES rmi_users(id) ON DELETE CASCADE,
    FOREIGN KEY (reminder_frequency) REFERENCES rmi_reminder_frequencies ON DELETE CASCADE
);

CREATE TABLE rmi_brand_tones(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    brand_tone VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

CREATE TABLE rmi_writing_styles (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    profile_id    INT,
    writing_style VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

CREATE TABLE rmi_voice_dos (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    voic_do    VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

CREATE TABLE rmi_voice_donts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    voic_dont  VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

CREATE TABLE rmi_example_phrases(
    id             INT AUTO_INCREMENT PRIMARY KEY,
    profile_id     INT,
    example_phrase VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

CREATE TABLE rmi_key_messages (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    profile_id  INT,
    key_message VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

CREATE TABLE rmi_content_goals (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    profile_id   INT,
    content_goal VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

CREATE TABLE rmi_saved_favourites(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    phrase     VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profile(id) ON DELETE CASCADE
);

