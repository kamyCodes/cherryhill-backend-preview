const router = require('express').Router();
const ServiceController = require('../controllers/Service.controller');
const TestimonialController = require('../controllers/Testimonial.controller');
const WebinarController = require('../controllers/Webinar.controller');
const PressReleaseController = require('../controllers/PressRelease.controller');
const FAQController = require('../controllers/FAQ.controller');
const ContactController = require('../controllers/Contact.controller');
const LeadershipController = require('../controllers/Leadership.controller');
const AwardController = require('../controllers/Award.controller');
const CompanyInfoController = require('../controllers/CompanyInfo.controller');

/**
 * @swagger
 * tags:
 *   name: Public - Services
 *   description: Public service endpoints
 */

/**
 * @swagger
 * /public/services:
 *   get:
 *     summary: Get all services
 *     tags: [Public - Services]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: boolean
 *         description: Filter only active services
 *     responses:
 *       200:
 *         description: List of services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Services fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c85
 *                       title:
 *                         type: string
 *                         example: Investment Banking
 *                       slug:
 *                         type: string
 *                         example: investment-banking
 *                       summary:
 *                         type: string
 *                         example: Strategic financial advisory and capital raising solutions
 *                       description:
 *                         type: string
 *                         example: Our investment banking division provides comprehensive financial advisory services...
 *                       icon:
 *                         type: string
 *                         example: https://cloudinary.com/icon.png
 *                       image:
 *                         type: string
 *                         example: https://cloudinary.com/image.png
 *                       features:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Mergers & Acquisitions", "Capital Raising", "Financial Restructuring"]
 *                       callToAction:
 *                         type: string
 *                         example: Contact Us
 *                       order:
 *                         type: number
 *                         example: 1
 *                       isActive:
 *                         type: boolean
 *                         example: true
 */
router.get('/services', ServiceController.getAllServices);

/**
 * @swagger
 * /public/services/{slug}:
 *   get:
 *     summary: Get service by slug
 *     tags: [Public - Services]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Service slug
 *         example: investment-banking
 *     responses:
 *       200:
 *         description: Service details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Service fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c85
 *                     title:
 *                       type: string
 *                       example: Investment Banking
 *                     slug:
 *                       type: string
 *                       example: investment-banking
 *                     summary:
 *                       type: string
 *                       example: Strategic financial advisory and capital raising solutions
 *                     description:
 *                       type: string
 *                       example: Our investment banking division provides comprehensive financial advisory services...
 *       404:
 *         description: Service not found
 */
router.get('/services/:slug', ServiceController.getServiceBySlug);

/**
 * @swagger
 * tags:
 *   name: Public - Testimonials
 *   description: Public testimonial endpoints
 */

/**
 * @swagger
 * /public/testimonials:
 *   get:
 *     summary: Get all approved testimonials
 *     tags: [Public - Testimonials]
 *     responses:
 *       200:
 *         description: List of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Testimonials fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c86
 *                       clientName:
 *                         type: string
 *                         example: John Smith
 *                       clientCompany:
 *                         type: string
 *                         example: Tech Corp Inc.
 *                       clientImage:
 *                         type: string
 *                         example: https://cloudinary.com/client.jpg
 *                       feedback:
 *                         type: string
 *                         example: Exceptional service and outstanding results!
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       order:
 *                         type: number
 *                         example: 1
 */
router.get('/testimonials', TestimonialController.getAllTestimonials);

/**
 * @swagger
 * tags:
 *   name: Public - Webinars
 *   description: Public webinar endpoints
 */

/**
 * @swagger
 * /public/webinars:
 *   get:
 *     summary: Get all webinars
 *     tags: [Public - Webinars]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: boolean
 *         description: Filter only active webinars
 *     responses:
 *       200:
 *         description: List of webinars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Webinars fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c87
 *                       title:
 *                         type: string
 *                         example: Future of Investment Banking
 *                       description:
 *                         type: string
 *                         example: Join us for an insightful webinar on emerging trends
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-15T14:00:00Z
 *                       duration:
 *                         type: string
 *                         example: 60 minutes
 *                       speaker:
 *                         type: string
 *                         example: Jane Doe, CEO
 *                       videoUrl:
 *                         type: string
 *                         example: https://youtube.com/watch?v=123
 *                       registrationLink:
 *                         type: string
 *                         example: https://zoom.us/webinar/register
 *                       image:
 *                         type: string
 *                         example: https://cloudinary.com/webinar.jpg
 *                       isUpcoming:
 *                         type: boolean
 *                         example: true
 */
router.get('/webinars', WebinarController.getAllWebinars);

/**
 * @swagger
 * /public/webinars/upcoming:
 *   get:
 *     summary: Get upcoming webinars
 *     tags: [Public - Webinars]
 *     responses:
 *       200:
 *         description: List of upcoming webinars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Upcoming webinars fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/webinars/upcoming', WebinarController.getUpcomingWebinars);

/**
 * @swagger
 * /public/webinars/past:
 *   get:
 *     summary: Get past webinars
 *     tags: [Public - Webinars]
 *     responses:
 *       200:
 *         description: List of past webinars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Past webinars fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/webinars/past', WebinarController.getPastWebinars);

/**
 * @swagger
 * /public/webinars/{id}:
 *   get:
 *     summary: Get webinar by ID
 *     tags: [Public - Webinars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Webinar ID
 *         example: 60d21b4667d0d8992e610c87
 *     responses:
 *       200:
 *         description: Webinar details
 *       404:
 *         description: Webinar not found
 */
router.get('/webinars/:id', WebinarController.getWebinarById);

/**
 * @swagger
 * tags:
 *   name: Public - Press Releases
 *   description: Public press release endpoints
 */

/**
 * @swagger
 * /public/press-releases:
 *   get:
 *     summary: Get all press releases
 *     tags: [Public - Press Releases]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: boolean
 *         description: Filter only active press releases
 *     responses:
 *       200:
 *         description: List of press releases
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Press releases fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c88
 *                       title:
 *                         type: string
 *                         example: Company Announces Record Growth
 *                       slug:
 *                         type: string
 *                         example: company-announces-record-growth
 *                       summary:
 *                         type: string
 *                         example: We are proud to announce record-breaking performance
 *                       content:
 *                         type: string
 *                         example: Detailed press release content here...
 *                       publicationDate:
 *                         type: string
 *                         format: date
 *                         example: 2024-01-15
 *                       author:
 *                         type: string
 *                         example: Communications Team
 *                       image:
 *                         type: string
 *                         example: https://cloudinary.com/press.jpg
 */
router.get('/press-releases', PressReleaseController.getAllPressReleases);

/**
 * @swagger
 * /public/press-releases/{slug}:
 *   get:
 *     summary: Get press release by slug
 *     tags: [Public - Press Releases]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Press release slug
 *         example: company-announces-record-growth
 *     responses:
 *       200:
 *         description: Press release details
 *       404:
 *         description: Press release not found
 */
router.get('/press-releases/:slug', PressReleaseController.getPressReleaseBySlug);

/**
 * @swagger
 * tags:
 *   name: Public - FAQs
 *   description: Public FAQ endpoints
 */

/**
 * @swagger
 * /public/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [Public - FAQs]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: boolean
 *         description: Filter only active FAQs
 *     responses:
 *       200:
 *         description: List of FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: FAQs fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c89
 *                       question:
 *                         type: string
 *                         example: What is your minimum investment requirement?
 *                       answer:
 *                         type: string
 *                         example: Our minimum investment requirement is $100,000...
 *                       category:
 *                         type: string
 *                         example: Investment
 *                       order:
 *                         type: number
 *                         example: 1
 */
router.get('/faqs', FAQController.getAllFAQs);

/**
 * @swagger
 * /public/faqs/categories:
 *   get:
 *     summary: Get all FAQ categories
 *     tags: [Public - FAQs]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Categories fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["General", "Investment", "Account", "Trading"]
 */
router.get('/faqs/categories', FAQController.getCategories);

/**
 * @swagger
 * /public/faqs/category/{category}:
 *   get:
 *     summary: Get FAQs by category
 *     tags: [Public - FAQs]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: FAQ category
 *         example: Investment
 *     responses:
 *       200:
 *         description: List of FAQs in category
 */
router.get('/faqs/category/:category', FAQController.getFAQsByCategory);

/**
 * @swagger
 * tags:
 *   name: Public - Contact
 *   description: Public contact endpoints
 */

/**
 * @swagger
 * /public/contact:
 *   post:
 *     summary: Submit contact form
 *     tags: [Public - Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: +1 (555) 123-4567
 *               message:
 *                 type: string
 *                 example: I am interested in learning more about your investment banking services. Could someone contact me?
 *     responses:
 *       201:
 *         description: Contact message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Contact message sent successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c90
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     phone:
 *                       type: string
 *                       example: +1 (555) 123-4567
 *                     message:
 *                       type: string
 *                       example: I am interested in learning more...
 *                     isRead:
 *                       type: boolean
 *                       example: false
 *                     replied:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-01-15T10:30:00Z
 *       400:
 *         description: Validation error
 */
router.post('/contact', ContactController.createContact);

/**
 * @swagger
 * tags:
 *   name: Public - Leadership
 *   description: Public leadership endpoints
 */

/**
 * @swagger
 * /public/leadership:
 *   get:
 *     summary: Get all leadership team members
 *     tags: [Public - Leadership]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: boolean
 *         description: Filter only active members
 *     responses:
 *       200:
 *         description: List of leadership members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Leadership members fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c91
 *                       name:
 *                         type: string
 *                         example: Sarah Johnson
 *                       position:
 *                         type: string
 *                         example: Chief Executive Officer
 *                       bio:
 *                         type: string
 *                         example: Sarah has over 20 years of experience in investment banking...
 *                       image:
 *                         type: string
 *                         example: https://cloudinary.com/sarah-johnson.jpg
 *                       email:
 *                         type: string
 *                         example: sarah.johnson@company.com
 *                       linkedin:
 *                         type: string
 *                         example: https://linkedin.com/in/sarahjohnson
 *                       order:
 *                         type: number
 *                         example: 1
 */
router.get('/leadership', LeadershipController.getAllLeadership);

/**
 * @swagger
 * tags:
 *   name: Public - Awards
 *   description: Public award endpoints
 */

/**
 * @swagger
 * /public/awards:
 *   get:
 *     summary: Get all awards
 *     tags: [Public - Awards]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: boolean
 *         description: Filter only active awards
 *     responses:
 *       200:
 *         description: List of awards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Awards fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c92
 *                       title:
 *                         type: string
 *                         example: Best Investment Bank 2024
 *                       awardingBody:
 *                         type: string
 *                         example: Global Finance Magazine
 *                       year:
 *                         type: number
 *                         example: 2024
 *                       description:
 *                         type: string
 *                         example: Recognized for excellence in cross-border M&A advisory
 *                       image:
 *                         type: string
 *                         example: https://cloudinary.com/award.jpg
 *                       order:
 *                         type: number
 *                         example: 1
 */
router.get('/awards', AwardController.getAllAwards);

/**
 * @swagger
 * tags:
 *   name: Public - Company Info
 *   description: Public company information endpoints
 */

/**
 * @swagger
 * /public/company-info:
 *   get:
 *     summary: Get company information
 *     tags: [Public - Company Info]
 *     responses:
 *       200:
 *         description: Company information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Company info fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     companyName:
 *                       type: string
 *                       example: Corporate Investment Platform
 *                     tagline:
 *                       type: string
 *                       example: Your Trusted Investment Partner
 *                     description:
 *                       type: string
 *                       example: Leading investment platform providing comprehensive financial solutions...
 *                     founded:
 *                       type: number
 *                       example: 2020
 *                     headquarters:
 *                       type: string
 *                       example: New York, USA
 *                     phone:
 *                       type: string
 *                       example: +1 (555) 123-4567
 *                     email:
 *                       type: string
 *                       example: info@corporateinvestment.com
 *                     address:
 *                       type: string
 *                       example: 123 Investment Avenue, Financial District, New York, NY 10005
 *                     mapUrl:
 *                       type: string
 *                       example: https://maps.google.com/...
 *                     socialMedia:
 *                       type: object
 *                       properties:
 *                         linkedin:
 *                           type: string
 *                           example: https://linkedin.com/company/corpinvest
 *                         twitter:
 *                           type: string
 *                           example: https://twitter.com/corpinvest
 *                         instagram:
 *                           type: string
 *                           example: https://instagram.com/corpinvest
 *                         facebook:
 *                           type: string
 *                           example: https://facebook.com/corpinvest
 *                     stats:
 *                       type: object
 *                       properties:
 *                         clients:
 *                           type: number
 *                           example: 500
 *                         assetsManaged:
 *                           type: string
 *                           example: $2.5B+
 *                         yearsOfExperience:
 *                           type: number
 *                           example: 10
 *                         teamMembers:
 *                           type: number
 *                           example: 50
 *                     mission:
 *                       type: string
 *                       example: To provide exceptional investment solutions that drive sustainable growth
 *                     vision:
 *                       type: string
 *                       example: To be the most trusted investment partner globally
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Integrity", "Excellence", "Innovation", "Client-Centric"]
 *                     whyChooseUs:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Years of industry expertise", "Proven track record"]
 *                     logo:
 *                       type: string
 *                       example: https://cloudinary.com/logo.png
 */
router.get('/company-info', CompanyInfoController.getCompanyInfo);

module.exports = router;