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
    to_be_activated           BOOLEAN      NOT NULL DEFAULT TRUE,
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
('graeme', 'graeme', 'burton', '01234 567890', 'graeme@moorwen.com', 'graeme', TRUE, NULL, NULL, NULL),
('rhianna', 'rhianna', 'clavering', '01234 567890', 'rhianna@moorwen.com', 'rhianna', TRUE, NULL, NULL, NULL)
('fred', 'fred', 'bloggs', '01234 567890', 'fred@bloggs.com', 'fred', FALSE, NULL, NULL, NULL),


-- Create platforms table
CREATE TABLE rmi_platforms (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
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
    id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    frequency VARCHAR(256) NOT NULL
);
INSERT INTO rmi_reminder_frequencies(frequency) VALUES
('Daily'),
('Weekly');

/*
Field Name		Description									Purpose/Used For
userid			Unique ID linking this profile to a specific user				Ensures brand data is tied to the correct account
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

-- Create rmi_profiles table
CREATE TABLE rmi_profiles (
    id                   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userid               INT UNSIGNED NOT NULL,
    business_name        VARCHAR(256),
    industry             VARCHAR(256),
    products_or_services VARCHAR(256),
    target_audience      VARCHAR(256),
    reminder_frequency	 INT UNSIGNED NOT NULL,
    FOREIGN KEY (userid) REFERENCES rmi_users(id) ON DELETE CASCADE,
    FOREIGN KEY (reminder_frequency) REFERENCES rmi_reminder_frequencies(id) ON DELETE CASCADE
);

CREATE TABLE rmi_brand_tones(
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id INT UNSIGNED NOT NULL,
    brand_tone VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);

CREATE TABLE rmi_writing_styles (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id    INT UNSIGNED,
    writing_style VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);

CREATE TABLE rmi_voice_dos (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id INT UNSIGNED,
    voice_do   VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);

CREATE TABLE rmi_voice_donts (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id INT UNSIGNED,
    voice_dont VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);i

CREATE TABLE rmi_example_phrases(
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id     INT UNSIGNED,
    example_phrase VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);

CREATE TABLE rmi_key_messages (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id  INT UNSIGNED,
    key_message VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);

CREATE TABLE rmi_content_goals (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id   INT UNSIGNED,
    content_goal VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);

CREATE TABLE rmi_saved_favourites(
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profile_id INT UNSIGNED,
    phrase     VARCHAR(256),
    FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
);


INSERT INTO rmi_profiles (
    userid,
    business_name,
    industry,
    products_or_services,
    target_audience,
    reminder_frequency
)
SELECT id, 'Bloggs Bananas', 'Greengrocers', 'Bananas', 'Banana buyers', 1
FROM rmi_users u
WHERE u.userid = 'fred';

INSERT INTO rmi_brand_tones(
    profile_id,
    brand_tone
)
SELECT p.id, 'Cheeky'
FROM rmi_profiles p,
     rmi_users    u
WHERE u.userid = 'fred'
AND   p.userid = u.id;

INSERT INTO rmi_writing_styles (
    profile_id,
    writing_style
)
SELECT p.id, 'Story-led'
FROM rmi_profiles p,
     rmi_users    u
WHERE u.userid = 'fred'
AND   p.userid = u.id;

INSERT INTO rmi_voice_dos (
    profile_id,
    voice_do
)
SELECT p.id, 'Humour'
FROM rmi_profiles p,
     rmi_users    u
WHERE u.userid = 'fred'
AND   p.userid = u.id;

INSERT INTO rmi_voice_donts (
    profile_id,
    voice_dont
)
SELECT p.id, 'Sounding salesy'
FROM rmi_profiles p,
     rmi_users    u
WHERE u.userid = 'fred'
AND   p.userid = u.id;

-- CREATE TABLE rmi_example_phrases(
--     id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--     profile_id     INT UNSIGNED,
--     example_phrase VARCHAR(256),
--     FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
-- );

INSERT INTO rmi_key_messages (
    profile_id,
    key_message
)
SELECT p.id, 'Home grown'
FROM rmi_profiles p,
     rmi_users    u
WHERE u.userid = 'fred'
AND   p.userid = u.id;

INSERT INTO rmi_content_goals (
    profile_id,
    content_goal
)
SELECT p.id, 'Drive sales'
FROM rmi_profiles p,
     rmi_users    u
WHERE u.userid = 'fred'
AND   p.userid = u.id;

-- CREATE TABLE rmi_saved_favourites(
--     id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--     profile_id INT UNSIGNED,
--     phrase     VARCHAR(256),
--     FOREIGN KEY (profile_id) REFERENCES rmi_profiles(id) ON DELETE CASCADE
-- );


-- Delete tables
DELETE FROM rmi_brand_tones;
DROP TABLE rmi_brand_tones;

DELETE FROM rmi_writing_styles;
DROP TABLE rmi_writing_styles;

DELETE FROM rmi_voice_dos;
DROP TABLE rmi_voice_dos;

DELETE FROM rmi_voice_donts;
DROP TABLE rmi_voice_donts;

DELETE FROM rmi_example_phrases;
DROP TABLE rmi_example_phrases;

DELETE FROM rmi_key_messages;
DROP TABLE rmi_key_messages;

DELETE FROM rmi_content_goals;
DROP TABLE rmi_content_goals;

DELETE FROM rmi_saved_favourites;
DROP TABLE rmi_saved_favourites;

DELETE FROM rmi_profiles;
DROP TABLE rmi_profiles;

DELETE FROM rmi_reminder_frequencies;
DROP TABLE rmi_reminder_frequencies

DELETE FROM rmi_platforms;
DROP TABLE rmi_platforms;

DELETE FROM rmi_users;
DROP TABLE rmi_users;



SELECT p.business_name        AS business_name,
       p.industry             AS industry,
       p.products_or_services AS products_or_services,
       p.target_audience      AS target_audience,
       r.frequency            AS frequency
FROM rmi_users u,
     rmi_profiles p,
     rmi_reminder_frequencies r       
WHERE u.userid = 'fred'
AND   u.id = p.userid
AND   p.reminder_frequency = r.id
