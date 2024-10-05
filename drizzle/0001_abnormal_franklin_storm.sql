ALTER TABLE `user` ADD `defaultTeamSlug` text REFERENCES team(slug);
