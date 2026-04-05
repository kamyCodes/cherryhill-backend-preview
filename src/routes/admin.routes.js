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
const AdminController = require('../controllers/Admin.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { uploadSingle, uploadMultiple } = require('../middlewares/upload.middleware');

// All admin routes require authentication
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Admin - Admin Management
 *   description: Admin user management (Super Admin only)
 */

/**
 * @swagger
 * /admin/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin - Admin Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admins
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
 *                   example: Admins fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c85
 *                       name:
 *                         type: string
 *                         example: John Admin
 *                       email:
 *                         type: string
 *                         example: admin@example.com
 *                       role:
 *                         type: string
 *                         example: admin
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       lastLogin:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-01-15T10:30:00Z
 *       403:
 *         description: Not authorized
 */
router.get('/admins', authorize('super_admin'), AdminController.getAllAdmins);

/**
 * @swagger
 * /admin/admins/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admin - Admin Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c85
 *     responses:
 *       200:
 *         description: Admin details
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
 *                   example: Admin fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c85
 *                     name:
 *                       type: string
 *                       example: John Admin
 *                     email:
 *                       type: string
 *                       example: admin@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *       404:
 *         description: Admin not found
 */
router.get('/admins/:id', authorize('super_admin'), AdminController.getAdminById);

/**
 * @swagger
 * /admin/admins:
 *   post:
 *     summary: Create new admin
 *     tags: [Admin - Admin Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Admin
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123
 *               role:
 *                 type: string
 *                 enum: [super_admin, admin, editor]
 *                 example: admin
 *     responses:
 *       201:
 *         description: Admin created successfully
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
 *                   example: Admin created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c86
 *                     name:
 *                       type: string
 *                       example: Jane Admin
 *                     email:
 *                       type: string
 *                       example: jane@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Email already exists
 */
router.post('/admins', authorize('super_admin'), AdminController.createAdmin);

/**
 * @swagger
 * /admin/admins/{id}:
 *   put:
 *     summary: Update admin
 *     tags: [Admin - Admin Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c85
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               role:
 *                 type: string
 *                 enum: [super_admin, admin, editor]
 *                 example: editor
 *     responses:
 *       200:
 *         description: Admin updated successfully
 */
router.put('/admins/:id', authorize('super_admin'), AdminController.updateAdmin);

/**
 * @swagger
 * /admin/admins/{id}:
 *   delete:
 *     summary: Delete admin
 *     tags: [Admin - Admin Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c86
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       400:
 *         description: Cannot delete the only super admin
 */
router.delete('/admins/:id', authorize('super_admin'), AdminController.deleteAdmin);

/**
 * @swagger
 * /admin/admins/{id}/toggle-status:
 *   patch:
 *     summary: Toggle admin active status
 *     tags: [Admin - Admin Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c85
 *     responses:
 *       200:
 *         description: Status toggled successfully
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
 *                   example: Admin status toggled successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c85
 *                     isActive:
 *                       type: boolean
 *                       example: false
 */
router.patch('/admins/:id/toggle-status', authorize('super_admin'), AdminController.toggleAdminStatus);

/**
 * @swagger
 * tags:
 *   name: Admin - Services
 *   description: Service management
 */

/**
 * @swagger
 * /admin/services:
 *   get:
 *     summary: Get all services
 *     tags: [Admin - Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all services
 */
router.get('/services', ServiceController.getAllServices);

/**
 * @swagger
 * /admin/services/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Admin - Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c87
 *     responses:
 *       200:
 *         description: Service details
 */
router.get('/services/:id', ServiceController.getServiceById);

/**
 * @swagger
 * /admin/services:
 *   post:
 *     summary: Create new service
 *     tags: [Admin - Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - summary
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Investment Banking
 *               summary:
 *                 type: string
 *                 example: Strategic financial advisory and capital raising solutions
 *               description:
 *                 type: string
 *                 example: Our investment banking division provides comprehensive financial advisory services...
 *               icon:
 *                 type: string
 *                 example: https://cloudinary.com/icon.png
 *               features:
 *                 type: string
 *                 example: Mergers & Acquisitions,Capital Raising,Restructuring
 *               callToAction:
 *                 type: string
 *                 example: Learn More
 *               order:
 *                 type: number
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Service created successfully
 */
router.post('/services', authorize('admin', 'super_admin'), uploadSingle('image'), ServiceController.createService);

/**
 * @swagger
 * /admin/services/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Admin - Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c87
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Investment Banking
 *               summary:
 *                 type: string
 *                 example: Updated summary
 *               description:
 *                 type: string
 *                 example: Updated description
 *               order:
 *                 type: number
 *                 example: 2
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Service updated successfully
 */
router.put('/services/:id', authorize('admin', 'super_admin'), uploadSingle('image'), ServiceController.updateService);

/**
 * @swagger
 * /admin/services/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Admin - Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c87
 *     responses:
 *       200:
 *         description: Service deleted successfully
 */
router.delete('/services/:id', authorize('admin', 'super_admin'), ServiceController.deleteService);

/**
 * @swagger
 * /admin/services/{id}/toggle-status:
 *   patch:
 *     summary: Toggle service status
 *     tags: [Admin - Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c87
 *     responses:
 *       200:
 *         description: Service status toggled successfully
 */
router.patch('/services/:id/toggle-status', authorize('admin', 'super_admin'), ServiceController.toggleServiceStatus);

/**
 * @swagger
 * tags:
 *   name: Admin - Testimonials
 *   description: Testimonial management
 */

/**
 * @swagger
 * /admin/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Admin - Testimonials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all testimonials
 */
router.get('/testimonials', TestimonialController.getAllTestimonials);

/**
 * @swagger
 * /admin/testimonials/{id}:
 *   get:
 *     summary: Get testimonial by ID
 *     tags: [Admin - Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c88
 *     responses:
 *       200:
 *         description: Testimonial details
 */
router.get('/testimonials/:id', TestimonialController.getTestimonialById);

/**
 * @swagger
 * /admin/testimonials:
 *   post:
 *     summary: Create new testimonial
 *     tags: [Admin - Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - feedback
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: John Smith
 *               clientCompany:
 *                 type: string
 *                 example: Tech Corp
 *               feedback:
 *                 type: string
 *                 example: Exceptional service and outstanding results!
 *               rating:
 *                 type: number
 *                 example: 5
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 */
router.post('/testimonials', authorize('admin', 'super_admin'), uploadSingle('image'), TestimonialController.createTestimonial);

/**
 * @swagger
 * /admin/testimonials/{id}:
 *   put:
 *     summary: Update testimonial
 *     tags: [Admin - Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c88
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: John Updated
 *               feedback:
 *                 type: string
 *                 example: Updated feedback
 *               rating:
 *                 type: number
 *                 example: 4
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 */
router.put('/testimonials/:id', authorize('admin', 'super_admin'), uploadSingle('image'), TestimonialController.updateTestimonial);

/**
 * @swagger
 * /admin/testimonials/{id}:
 *   delete:
 *     summary: Delete testimonial
 *     tags: [Admin - Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c88
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 */
router.delete('/testimonials/:id', authorize('admin', 'super_admin'), TestimonialController.deleteTestimonial);

/**
 * @swagger
 * /admin/testimonials/{id}/approve:
 *   patch:
 *     summary: Approve testimonial
 *     tags: [Admin - Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c88
 *     responses:
 *       200:
 *         description: Testimonial approved successfully
 */
router.patch('/testimonials/:id/approve', authorize('admin', 'super_admin'), TestimonialController.approveTestimonial);

/**
 * @swagger
 * tags:
 *   name: Admin - Webinars
 *   description: Webinar management
 */

/**
 * @swagger
 * /admin/webinars:
 *   get:
 *     summary: Get all webinars
 *     tags: [Admin - Webinars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all webinars
 */
router.get('/webinars', WebinarController.getAllWebinars);

/**
 * @swagger
 * /admin/webinars/{id}:
 *   get:
 *     summary: Get webinar by ID
 *     tags: [Admin - Webinars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c89
 *     responses:
 *       200:
 *         description: Webinar details
 */
router.get('/webinars/:id', WebinarController.getWebinarById);

/**
 * @swagger
 * /admin/webinars:
 *   post:
 *     summary: Create new webinar
 *     tags: [Admin - Webinars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Future of Investment Banking
 *               description:
 *                 type: string
 *                 example: Join us for an insightful webinar on emerging trends
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-15T14:00:00Z
 *               duration:
 *                 type: string
 *                 example: 60 minutes
 *               speaker:
 *                 type: string
 *                 example: Jane Doe, CEO
 *               videoUrl:
 *                 type: string
 *                 example: https://youtube.com/watch?v=123
 *               registrationLink:
 *                 type: string
 *                 example: https://zoom.us/webinar/register
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Webinar created successfully
 */
router.post('/webinars', authorize('admin', 'super_admin'), uploadSingle('image'), WebinarController.createWebinar);

/**
 * @swagger
 * /admin/webinars/{id}:
 *   put:
 *     summary: Update webinar
 *     tags: [Admin - Webinars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c89
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Webinar Title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-20T15:00:00Z
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Webinar updated successfully
 */
router.put('/webinars/:id', authorize('admin', 'super_admin'), uploadSingle('image'), WebinarController.updateWebinar);

/**
 * @swagger
 * /admin/webinars/{id}:
 *   delete:
 *     summary: Delete webinar
 *     tags: [Admin - Webinars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c89
 *     responses:
 *       200:
 *         description: Webinar deleted successfully
 */
router.delete('/webinars/:id', authorize('admin', 'super_admin'), WebinarController.deleteWebinar);

/**
 * @swagger
 * tags:
 *   name: Admin - Press Releases
 *   description: Press release management
 */

/**
 * @swagger
 * /admin/press-releases:
 *   get:
 *     summary: Get all press releases
 *     tags: [Admin - Press Releases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all press releases
 */
router.get('/press-releases', PressReleaseController.getAllPressReleases);

/**
 * @swagger
 * /admin/press-releases/{id}:
 *   get:
 *     summary: Get press release by ID
 *     tags: [Admin - Press Releases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c90
 *     responses:
 *       200:
 *         description: Press release details
 */
router.get('/press-releases/:id', PressReleaseController.getPressReleaseById);

/**
 * @swagger
 * /admin/press-releases:
 *   post:
 *     summary: Create new press release
 *     tags: [Admin - Press Releases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - summary
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Company Announces Record Growth
 *               summary:
 *                 type: string
 *                 example: We are proud to announce record-breaking performance
 *               content:
 *                 type: string
 *                 example: Detailed press release content here...
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               author:
 *                 type: string
 *                 example: Communications Team
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Press release created successfully
 */
router.post('/press-releases', authorize('admin', 'super_admin'), uploadSingle('image'), PressReleaseController.createPressRelease);

/**
 * @swagger
 * /admin/press-releases/{id}:
 *   put:
 *     summary: Update press release
 *     tags: [Admin - Press Releases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c90
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Press Release Title
 *               content:
 *                 type: string
 *                 example: Updated content
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Press release updated successfully
 */
router.put('/press-releases/:id', authorize('admin', 'super_admin'), uploadSingle('image'), PressReleaseController.updatePressRelease);

/**
 * @swagger
 * /admin/press-releases/{id}:
 *   delete:
 *     summary: Delete press release
 *     tags: [Admin - Press Releases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c90
 *     responses:
 *       200:
 *         description: Press release deleted successfully
 */
router.delete('/press-releases/:id', authorize('admin', 'super_admin'), PressReleaseController.deletePressRelease);

/**
 * @swagger
 * tags:
 *   name: Admin - FAQs
 *   description: FAQ management
 */

/**
 * @swagger
 * /admin/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [Admin - FAQs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all FAQs
 */
router.get('/faqs', FAQController.getAllFAQs);

/**
 * @swagger
 * /admin/faqs/{id}:
 *   get:
 *     summary: Get FAQ by ID
 *     tags: [Admin - FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c91
 *     responses:
 *       200:
 *         description: FAQ details
 */
router.get('/faqs/:id', FAQController.getFAQById);

/**
 * @swagger
 * /admin/faqs:
 *   post:
 *     summary: Create new FAQ
 *     tags: [Admin - FAQs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: What is your minimum investment?
 *               answer:
 *                 type: string
 *                 example: Our minimum investment is $100,000
 *               category:
 *                 type: string
 *                 example: Investment
 *               order:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: FAQ created successfully
 */
router.post('/faqs', authorize('admin', 'super_admin'), FAQController.createFAQ);

/**
 * @swagger
 * /admin/faqs/{id}:
 *   put:
 *     summary: Update FAQ
 *     tags: [Admin - FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c91
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: Updated question
 *               answer:
 *                 type: string
 *                 example: Updated answer
 *               category:
 *                 type: string
 *                 example: General
 *               order:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 */
router.put('/faqs/:id', authorize('admin', 'super_admin'), FAQController.updateFAQ);

/**
 * @swagger
 * /admin/faqs/{id}:
 *   delete:
 *     summary: Delete FAQ
 *     tags: [Admin - FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c91
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 */
router.delete('/faqs/:id', authorize('admin', 'super_admin'), FAQController.deleteFAQ);

/**
 * @swagger
 * tags:
 *   name: Admin - Contacts
 *   description: Contact message management
 */

/**
 * @swagger
 * /admin/contacts:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Admin - Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isRead
 *         schema:
 *           type: boolean
 *         description: Filter by read status
 *     responses:
 *       200:
 *         description: List of contact messages
 */
router.get('/contacts', ContactController.getAllContacts);

/**
 * @swagger
 * /admin/contacts/unread-count:
 *   get:
 *     summary: Get unread contact count
 *     tags: [Admin - Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count
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
 *                   example: Unread count fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: number
 *                       example: 5
 */
router.get('/contacts/unread-count', ContactController.getUnreadCount);

/**
 * @swagger
 * /admin/contacts/{id}:
 *   get:
 *     summary: Get contact message by ID
 *     tags: [Admin - Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c92
 *     responses:
 *       200:
 *         description: Contact message details
 */
router.get('/contacts/:id', ContactController.getContactById);

/**
 * @swagger
 * /admin/contacts/{id}:
 *   delete:
 *     summary: Delete contact message
 *     tags: [Admin - Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c92
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 */
router.delete('/contacts/:id', authorize('admin', 'super_admin'), ContactController.deleteContact);

/**
 * @swagger
 * /admin/contacts/{id}/read:
 *   patch:
 *     summary: Mark contact as read
 *     tags: [Admin - Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c92
 *     responses:
 *       200:
 *         description: Contact marked as read
 */
router.patch('/contacts/:id/read', ContactController.markAsRead);

/**
 * @swagger
 * /admin/contacts/{id}/reply:
 *   patch:
 *     summary: Reply to contact message
 *     tags: [Admin - Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c92
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - message
 *             properties:
 *               subject:
 *                 type: string
 *                 example: Regarding your inquiry
 *               message:
 *                 type: string
 *                 example: Thank you for reaching out. Our team will contact you shortly.
 *     responses:
 *       200:
 *         description: Reply sent successfully
 */
router.patch('/contacts/:id/reply', authorize('admin', 'super_admin'), ContactController.replyToContact);

/**
 * @swagger
 * tags:
 *   name: Admin - Leadership
 *   description: Leadership team management
 */

/**
 * @swagger
 * /admin/leadership:
 *   get:
 *     summary: Get all leadership members
 *     tags: [Admin - Leadership]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leadership members
 */
router.get('/leadership', LeadershipController.getAllLeadership);

/**
 * @swagger
 * /admin/leadership/{id}:
 *   get:
 *     summary: Get leadership member by ID
 *     tags: [Admin - Leadership]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c93
 *     responses:
 *       200:
 *         description: Leadership member details
 */
router.get('/leadership/:id', LeadershipController.getLeadershipById);

/**
 * @swagger
 * /admin/leadership:
 *   post:
 *     summary: Create new leadership member
 *     tags: [Admin - Leadership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - bio
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sarah Johnson
 *               position:
 *                 type: string
 *                 example: Chief Executive Officer
 *               bio:
 *                 type: string
 *                 example: Sarah has over 20 years of experience...
 *               email:
 *                 type: string
 *                 example: sarah@company.com
 *               linkedin:
 *                 type: string
 *                 example: https://linkedin.com/in/sarahjohnson
 *               order:
 *                 type: number
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Leadership member created successfully
 */
router.post('/leadership', authorize('admin', 'super_admin'), uploadSingle('image'), LeadershipController.createLeadership);

/**
 * @swagger
 * /admin/leadership/{id}:
 *   put:
 *     summary: Update leadership member
 *     tags: [Admin - Leadership]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c93
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sarah Johnson Updated
 *               position:
 *                 type: string
 *                 example: CEO & Chairperson
 *               bio:
 *                 type: string
 *                 example: Updated bio
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Leadership member updated successfully
 */
router.put('/leadership/:id', authorize('admin', 'super_admin'), uploadSingle('image'), LeadershipController.updateLeadership);

/**
 * @swagger
 * /admin/leadership/{id}:
 *   delete:
 *     summary: Delete leadership member
 *     tags: [Admin - Leadership]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c93
 *     responses:
 *       200:
 *         description: Leadership member deleted successfully
 */
router.delete('/leadership/:id', authorize('admin', 'super_admin'), LeadershipController.deleteLeadership);

/**
 * @swagger
 * tags:
 *   name: Admin - Awards
 *   description: Award management
 */

/**
 * @swagger
 * /admin/awards:
 *   get:
 *     summary: Get all awards
 *     tags: [Admin - Awards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of awards
 */
router.get('/awards', AwardController.getAllAwards);

/**
 * @swagger
 * /admin/awards/{id}:
 *   get:
 *     summary: Get award by ID
 *     tags: [Admin - Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c94
 *     responses:
 *       200:
 *         description: Award details
 */
router.get('/awards/:id', AwardController.getAwardById);

/**
 * @swagger
 * /admin/awards:
 *   post:
 *     summary: Create new award
 *     tags: [Admin - Awards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - awardingBody
 *               - year
 *             properties:
 *               title:
 *                 type: string
 *                 example: Best Investment Bank 2024
 *               awardingBody:
 *                 type: string
 *                 example: Global Finance Magazine
 *               year:
 *                 type: number
 *                 example: 2024
 *               description:
 *                 type: string
 *                 example: Recognized for excellence in M&A advisory
 *               order:
 *                 type: number
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Award created successfully
 */
router.post('/awards', authorize('admin', 'super_admin'), uploadSingle('image'), AwardController.createAward);

/**
 * @swagger
 * /admin/awards/{id}:
 *   put:
 *     summary: Update award
 *     tags: [Admin - Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c94
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Best Investment Bank 2025
 *               year:
 *                 type: number
 *                 example: 2025
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Award updated successfully
 */
router.put('/awards/:id', authorize('admin', 'super_admin'), uploadSingle('image'), AwardController.updateAward);

/**
 * @swagger
 * /admin/awards/{id}:
 *   delete:
 *     summary: Delete award
 *     tags: [Admin - Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 60d21b4667d0d8992e610c94
 *     responses:
 *       200:
 *         description: Award deleted successfully
 */
router.delete('/awards/:id', authorize('admin', 'super_admin'), AwardController.deleteAward);

/**
 * @swagger
 * tags:
 *   name: Admin - Company Info
 *   description: Company information management
 */

/**
 * @swagger
 * /admin/company-info:
 *   get:
 *     summary: Get company information
 *     tags: [Admin - Company Info]
 *     security:
 *       - bearerAuth: []
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
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c95
 *                     companyName:
 *                       type: string
 *                       example: Corporate Investment Platform
 *                     tagline:
 *                       type: string
 *                       example: Your Trusted Investment Partner
 *                     description:
 *                       type: string
 *                       example: Leading investment platform...
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
 *                       example: 123 Investment Avenue
 *                     mission:
 *                       type: string
 *                       example: To provide exceptional investment solutions...
 *                     vision:
 *                       type: string
 *                       example: To be the most trusted investment partner...
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
 *                     whyChooseUs:
 *                       type: array
 *                       items:
 *                         type: string
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
 *                           example: 20
 *                         teamMembers:
 *                           type: number
 *                           example: 50
 *       404:
 *         description: Company info not found
 */
router.get('/company-info', CompanyInfoController.getCompanyInfo);

/**
 * @swagger
 * /admin/company-info:
 *   post:
 *     summary: Create company information (first time setup)
 *     tags: [Admin - Company Info]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - description
 *               - founded
 *               - headquarters
 *               - phone
 *               - email
 *               - address
 *               - mission
 *               - vision
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Corporate Investment Platform
 *               tagline:
 *                 type: string
 *                 example: Your Trusted Investment Partner
 *               description:
 *                 type: string
 *                 example: Leading investment platform providing comprehensive financial solutions...
 *               founded:
 *                 type: number
 *                 example: 2020
 *               headquarters:
 *                 type: string
 *                 example: New York, USA
 *               phone:
 *                 type: string
 *                 example: +1 (555) 123-4567
 *               email:
 *                 type: string
 *                 example: info@corporateinvestment.com
 *               address:
 *                 type: string
 *                 example: 123 Investment Avenue, Financial District, New York, NY 10005
 *               mapUrl:
 *                 type: string
 *                 example: https://maps.google.com/...
 *               mission:
 *                 type: string
 *                 example: To provide exceptional investment solutions that drive sustainable growth
 *               vision:
 *                 type: string
 *                 example: To be the most trusted investment partner globally
 *               values:
 *                 type: string
 *                 example: Integrity,Excellence,Innovation,Client-Centric
 *               whyChooseUs:
 *                 type: string
 *                 example: Years of expertise,Proven track record,Personalized solutions
 *               linkedin:
 *                 type: string
 *                 example: https://linkedin.com/company/corpinvest
 *               twitter:
 *                 type: string
 *                 example: https://twitter.com/corpinvest
 *               instagram:
 *                 type: string
 *                 example: https://instagram.com/corpinvest
 *               facebook:
 *                 type: string
 *                 example: https://facebook.com/corpinvest
 *               logo:
 *                 type: string
 *                 format: binary
 *               favicon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Company info created successfully
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
 *                   example: Company info created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c95
 *                     companyName:
 *                       type: string
 *                       example: Corporate Investment Platform
 *       400:
 *         description: Company info already exists
 */
router.post('/company-info', authorize('admin', 'super_admin'), uploadMultiple([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), CompanyInfoController.createCompanyInfo);

/**
 * @swagger
 * /admin/company-info:
 *   put:
 *     summary: Update company information
 *     tags: [Admin - Company Info]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Updated Company Name
 *               tagline:
 *                 type: string
 *                 example: Updated Tagline
 *               description:
 *                 type: string
 *                 example: Updated description
 *               founded:
 *                 type: number
 *                 example: 2021
 *               headquarters:
 *                 type: string
 *                 example: London, UK
 *               phone:
 *                 type: string
 *                 example: +44 20 1234 5678
 *               email:
 *                 type: string
 *                 example: updated@company.com
 *               address:
 *                 type: string
 *                 example: 456 New Address
 *               mission:
 *                 type: string
 *                 example: Updated mission
 *               vision:
 *                 type: string
 *                 example: Updated vision
 *               logo:
 *                 type: string
 *                 format: binary
 *               favicon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Company info updated successfully
 */
router.put('/company-info', authorize('admin', 'super_admin'), uploadMultiple([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), CompanyInfoController.updateCompanyInfo);

/**
 * @swagger
 * /admin/company-info/stats:
 *   patch:
 *     summary: Update company statistics
 *     tags: [Admin - Company Info]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clients:
 *                 type: number
 *                 example: 750
 *               assetsManaged:
 *                 type: string
 *                 example: $3.8B+
 *               yearsOfExperience:
 *                 type: number
 *                 example: 25
 *               teamMembers:
 *                 type: number
 *                 example: 75
 *     responses:
 *       200:
 *         description: Company statistics updated successfully
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
 *                   example: Company stats updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         clients:
 *                           type: number
 *                           example: 750
 *                         assetsManaged:
 *                           type: string
 *                           example: $3.8B+
 *                         yearsOfExperience:
 *                           type: number
 *                           example: 25
 *                         teamMembers:
 *                           type: number
 *                           example: 75
 */
router.patch('/company-info/stats', authorize('admin', 'super_admin'), CompanyInfoController.updateStats);

module.exports = router;