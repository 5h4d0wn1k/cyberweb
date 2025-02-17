-- Seed initial courses
INSERT INTO public.courses (id, title, slug, description, difficulty, category, points, is_published)
VALUES
  (
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'Web Application Security Fundamentals',
    'web-security-fundamentals',
    'Learn the fundamentals of web application security, including common vulnerabilities, attack vectors, and defense strategies.',
    'Beginner',
    'offensive',
    100,
    true
  ),
  (
    'c0a80121-7ac0-4e71-a7a5-4371f4268c40',
    'Network Security Essentials',
    'network-security-essentials',
    'Master the essentials of network security, including protocols, architecture, and common attack patterns.',
    'Beginner',
    'defensive',
    100,
    true
  ),
  (
    'c0a80121-7ac0-4e71-a7a5-4371f4268c41',
    'Smart Contract Security',
    'smart-contract-security',
    'Learn how to identify and prevent security vulnerabilities in smart contracts and blockchain applications.',
    'Intermediate',
    'web3',
    150,
    true
  );

-- Seed modules for Web Security course
INSERT INTO public.modules (id, course_id, title, description, order_index, points)
VALUES
  (
    'd1b90121-7ac0-4e71-a7a5-4371f4268c3f',
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'Introduction to Web Security',
    'Understanding the basics of web security and the OWASP Top 10.',
    1,
    25
  ),
  (
    'd1b90121-7ac0-4e71-a7a5-4371f4268c40',
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'Cross-Site Scripting (XSS)',
    'Learn about XSS vulnerabilities and how to prevent them.',
    2,
    35
  ),
  (
    'd1b90121-7ac0-4e71-a7a5-4371f4268c41',
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'SQL Injection',
    'Understanding and preventing SQL injection attacks.',
    3,
    40
  );

-- Seed challenges for Web Security modules
INSERT INTO public.challenges (id, module_id, title, description, difficulty, points, flag, hints, order_index)
VALUES
  (
    'e2c90121-7ac0-4e71-a7a5-4371f4268c3f',
    'd1b90121-7ac0-4e71-a7a5-4371f4268c3f',
    'Web Security Basics',
    'Complete this challenge to demonstrate your understanding of basic web security concepts.',
    'Beginner',
    10,
    'FLAG{w3b_s3cur1ty_b4s1cs}',
    ARRAY['Think about the most common web vulnerabilities', 'Review the OWASP Top 10'],
    1
  ),
  (
    'e2c90121-7ac0-4e71-a7a5-4371f4268c40',
    'd1b90121-7ac0-4e71-a7a5-4371f4268c40',
    'Find the XSS',
    'Identify and exploit a cross-site scripting vulnerability in the provided application.',
    'Beginner',
    15,
    'FLAG{xss_m4st3r}',
    ARRAY['Look for user input fields', 'Think about how to inject JavaScript'],
    1
  ),
  (
    'e2c90121-7ac0-4e71-a7a5-4371f4268c41',
    'd1b90121-7ac0-4e71-a7a5-4371f4268c41',
    'SQL Injection 101',
    'Exploit a basic SQL injection vulnerability to access unauthorized data.',
    'Beginner',
    20,
    'FLAG{sql_1nj3ct10n_pr0}',
    ARRAY['Think about how SQL queries are constructed', 'Try manipulating the WHERE clause'],
    1
  );

-- Seed some achievements
INSERT INTO public.achievements (id, title, description, image_url, points)
VALUES
  (
    'f3d90121-7ac0-4e71-a7a5-4371f4268c3f',
    'Web Security Novice',
    'Complete your first web security challenge',
    '/achievements/web-security-novice.png',
    50
  ),
  (
    'f3d90121-7ac0-4e71-a7a5-4371f4268c40',
    'XSS Hunter',
    'Successfully identify and exploit an XSS vulnerability',
    '/achievements/xss-hunter.png',
    75
  ),
  (
    'f3d90121-7ac0-4e71-a7a5-4371f4268c41',
    'SQL Master',
    'Complete all SQL injection challenges',
    '/achievements/sql-master.png',
    100
  ); 