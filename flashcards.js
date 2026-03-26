// ============================================================
// flashcards.js — Salesforce Admin Exam Prep flashcard data
// Format: { category, question, options (MCQ only), answer, explanation }
// ============================================================

const FLASHCARDS = [
  // ── CONFIG & SETUP ──────────────────────────────────────────
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "What is the maximum number of custom profiles you can create in Salesforce?",
    answer: "There is no hard limit on custom profiles, but it is best practice to minimise profile proliferation and use permission sets instead.",
    explanation: "Salesforce does not enforce a fixed cap on profiles, but excessive profiles become hard to manage. Permission sets and permission set groups are the preferred granular access model."
  },
  {
    category: "MCQ",
    topic: "Config & Setup",
    question: "An admin needs to give a group of users access to a specific set of objects and fields without changing their profile. What should they use?",
    options: ["A. Role hierarchy", "B. Permission set", "C. Sharing rule", "D. Field-level security on the profile"],
    answer: "B. Permission set",
    explanation: "Permission sets grant additional access on top of a profile without changing the profile itself — ideal for supplemental, targeted access."
  },
  {
    category: "MCQ",
    topic: "Config & Setup",
    question: "Which sandbox type is a full copy of production data AND metadata?",
    options: ["A. Developer sandbox", "B. Developer Pro sandbox", "C. Partial Copy sandbox", "D. Full sandbox"],
    answer: "D. Full sandbox",
    explanation: "Only the Full sandbox copies all production data and metadata. It is used for load testing and final UAT. It takes the longest to create and refresh (every 29 days)."
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "What is the difference between a Partial Copy and a Full sandbox?",
    answer: "Partial Copy contains a sample of production data (up to 10 000 records per object) plus all metadata. Full sandbox is a complete replica of production data and metadata.",
    explanation: "Partial Copy refreshes every 5 days; Full sandbox every 29 days. Partial is faster to create but lacks the complete dataset needed for load testing."
  },
  {
    category: "Tricky",
    topic: "Config & Setup",
    question: "A company has offices in New York, London, and Tokyo. Each office uses a different currency. Which Salesforce feature must be enabled to support this?",
    answer: "Multiple Currencies must be enabled by Salesforce Support. Once enabled it cannot be disabled.",
    explanation: "Multiple Currencies is an org-wide setting enabled by support. Advanced Currency Management adds dated exchange rates for opportunities. Warning: it cannot be turned off once enabled."
  },
  {
    category: "MCQ",
    topic: "Config & Setup",
    question: "Which of the following actions CANNOT be performed in a sandbox and then deployed to production?",
    options: ["A. Custom object creation", "B. Flow configuration", "C. Enabling Multiple Currencies", "D. Creating a custom app"],
    answer: "C. Enabling Multiple Currencies",
    explanation: "Multiple Currencies is enabled by Salesforce Support directly in production — it is not something you configure in a sandbox and deploy via change set."
  },

  // ── OBJECT MANAGER & APP BUILDER ─────────────────────────────
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "What is the difference between a Master-Detail and a Lookup relationship?",
    answer: "Master-Detail: child inherits owner and sharing from parent; deleting parent deletes child; roll-up summaries possible. Lookup: child has independent owner/sharing; deletion optional; no roll-up summaries.",
    explanation: "Master-Detail is a tighter dependency — the child cannot exist without the parent. Lookups are loosely coupled. Only Master-Detail supports roll-up summary fields."
  },
  {
    category: "MCQ",
    topic: "Object Manager",
    question: "A user wants to count the number of closed Opportunities on an Account. Which field type should the admin create on Account?",
    options: ["A. Formula field", "B. Cross-object formula", "C. Roll-Up Summary field", "D. Lookup filter"],
    answer: "C. Roll-Up Summary field",
    explanation: "Roll-Up Summary fields (COUNT, SUM, MIN, MAX) aggregate child records in a Master-Detail relationship. Account → Opportunity is a standard master-detail, so this is supported."
  },
  {
    category: "Tricky",
    topic: "Object Manager",
    question: "Can you convert a Master-Detail relationship to a Lookup relationship?",
    answer: "Yes — you can convert Master-Detail to Lookup, but you lose roll-up summary fields. You CANNOT convert Lookup to Master-Detail if there are records with blank lookup values.",
    explanation: "Converting from Lookup to Master-Detail requires all existing records to already have a populated lookup value. If any are blank, the conversion fails."
  },
  {
    category: "MCQ",
    topic: "Object Manager",
    question: "What is the maximum number of custom fields you can create on a standard object?",
    options: ["A. 100", "B. 250", "C. 500", "D. 800"],
    answer: "C. 500",
    explanation: "Salesforce allows up to 500 custom fields per standard object (and 800 per custom object in some editions). This is a commonly tested limit."
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "What is a Record Type used for?",
    answer: "Record Types allow different picklist values, page layouts, and business processes for different groups of users on the same object.",
    explanation: "For example, a 'Residential' and 'Commercial' record type on Account can show different fields and picklist options to different teams."
  },
  {
    category: "MCQ",
    topic: "App Builder",
    question: "Which Lightning App Builder component type is provided by Salesforce and cannot be modified?",
    options: ["A. Custom components", "B. Standard components", "C. AppExchange components", "D. Partner components"],
    answer: "B. Standard components",
    explanation: "Standard components (e.g., Highlights Panel, Related Lists, Chatter Feed) are provided by Salesforce out of the box. Custom and AppExchange components can be modified."
  },

  // ── WORKFLOW & AUTOMATION ─────────────────────────────────────
  {
    category: "Concepts",
    topic: "Automation",
    question: "What is the order of execution for automation in Salesforce when a record is saved?",
    answer: "1. Validation rules → 2. Before-save flows → 3. Duplicate rules → 4. Assignment/auto-response/escalation rules → 5. Workflow rules → 6. Processes (Process Builder) → 7. After-save flows → 8. Approval processes → 9. Triggers",
    explanation: "This order is critical. Flows run before and after triggers. Validation rules fire first, so a failing validation stops everything else."
  },
  {
    category: "MCQ",
    topic: "Automation",
    question: "An admin wants to automatically assign Cases to a queue when a specific condition is met, without writing code. What is the BEST tool?",
    options: ["A. Workflow Rule with field update", "B. Escalation Rule", "C. Flow with Record-Triggered automation", "D. Assignment Rule"],
    answer: "D. Assignment Rule",
    explanation: "Case Assignment Rules automatically route cases to users or queues based on criteria — this is their primary purpose. Flows can also do this but Assignment Rules are the purpose-built declarative tool."
  },
  {
    category: "MCQ",
    topic: "Automation",
    question: "Which type of Flow is triggered when a record is created or updated?",
    options: ["A. Screen Flow", "B. Scheduled-Triggered Flow", "C. Record-Triggered Flow", "D. Platform Event-Triggered Flow"],
    answer: "C. Record-Triggered Flow",
    explanation: "Record-Triggered Flows fire automatically when a record is created, updated, or deleted. They replace Workflow Rules and Process Builder for most automation."
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "What is the difference between a before-save and after-save Flow?",
    answer: "Before-save: runs before the record is written to the database, can update the triggering record without a DML. After-save: runs after the database write, can perform DML on other records but NOT update the triggering record directly.",
    explanation: "Before-save flows are faster and more efficient for updating the triggering record. After-save flows are needed for related record updates."
  },
  {
    category: "MCQ",
    topic: "Automation",
    question: "Workflow Rules are being retired by Salesforce. Which tool is the recommended replacement?",
    options: ["A. Process Builder", "B. Apex Triggers", "C. Flow Builder (Record-Triggered Flow)", "D. Scheduled Jobs"],
    answer: "C. Flow Builder (Record-Triggered Flow)",
    explanation: "Salesforce is retiring both Workflow Rules and Process Builder. Record-Triggered Flows in Flow Builder are the supported replacement and offer more power and flexibility."
  },
  {
    category: "Tricky",
    topic: "Automation",
    question: "An Escalation Rule is configured to escalate cases after 2 hours. When does the 2-hour timer reset?",
    answer: "The timer resets if the case is modified in a way that changes the criteria (e.g., the case status changes to a value that re-evaluates the rule). It does NOT reset on every save — only when the rule criteria are re-evaluated from scratch.",
    explanation: "A common trap: the timer is based on the time since the case entered the current state matching the rule, not since the last modification."
  },

  // ── DATA & ANALYTICS ─────────────────────────────────────────
  {
    category: "MCQ",
    topic: "Data & Analytics",
    question: "What is the maximum number of records the Data Import Wizard can import in a single operation?",
    options: ["A. 5,000", "B. 10,000", "C. 50,000", "D. 100,000"],
    answer: "C. 50,000",
    explanation: "Data Import Wizard supports up to 50,000 records per import. For larger data volumes, Data Loader (up to 5 million records) is required."
  },
  {
    category: "MCQ",
    topic: "Data & Analytics",
    question: "Which tool is required to EXPORT data from Salesforce using the command line?",
    options: ["A. Data Import Wizard", "B. Reports", "C. Data Loader", "D. SOQL Query Editor"],
    answer: "C. Data Loader",
    explanation: "Data Loader supports both import and export operations via command line or UI. Data Import Wizard is import-only and has no command line interface."
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "What is the difference between a Tabular, Summary, and Matrix report?",
    answer: "Tabular: simple list of records, no grouping, cannot be used in dashboards. Summary: grouped by rows with subtotals, can be used in dashboards. Matrix: grouped by both rows and columns, supports cross-tabulation.",
    explanation: "A Joined report allows multiple report blocks of different types. Dashboard components require Summary, Matrix, or Joined reports — not Tabular."
  },
  {
    category: "MCQ",
    topic: "Data & Analytics",
    question: "A dashboard component shows data as of a specific point in time. What feature enables this?",
    options: ["A. Dynamic dashboards", "B. Scheduled reports", "C. Dashboard filters", "D. Snapshot reports"],
    answer: "D. Snapshot reports",
    explanation: "Analytic Snapshots (Reporting Snapshots) capture report data at scheduled intervals and store it in a custom object, enabling historical trend analysis."
  },
  {
    category: "Tricky",
    topic: "Data & Analytics",
    question: "A user can run a report but sees fewer records than expected. What is the most likely cause?",
    answer: "The report respects the user's record visibility (sharing settings). The user can only see records they have access to based on the org-wide defaults, role hierarchy, sharing rules, and manual shares.",
    explanation: "Reports do NOT override security. A user running a report only sees records they can access. Admins can use 'Run as' in dashboards to show data from a specific user's perspective."
  },
  {
    category: "MCQ",
    topic: "Data & Analytics",
    question: "Which validation rule function checks if a field has been changed?",
    options: ["A. ISCHANGED()", "B. ISNEW()", "C. PRIORVALUE()", "D. ISBLANK()"],
    answer: "A. ISCHANGED()",
    explanation: "ISCHANGED() returns TRUE if the field value has changed since the last save. ISNEW() checks if the record is being created for the first time. PRIORVALUE() returns the value before the change."
  },

  // ── SECURITY & SHARING ────────────────────────────────────────
  {
    category: "Concepts",
    topic: "Security",
    question: "Explain the Salesforce Security Model from broadest to most specific.",
    answer: "1. Organisation-level (login hours, IP restrictions) → 2. Object-level (CRUD via profiles/permission sets) → 3. Record-level (OWD, role hierarchy, sharing rules, manual sharing) → 4. Field-level (FLS via profiles/permission sets)",
    explanation: "The model works top-down. You cannot give more access at a lower level than allowed above. FLS 'read-only' cannot be overridden by sharing rules — it only controls what fields are visible, not which records."
  },
  {
    category: "MCQ",
    topic: "Security",
    question: "Org-Wide Defaults (OWD) are set to Private for Accounts. A user can still see an Account they do not own. What is the MOST LIKELY reason?",
    options: ["A. They have the 'Modify All Data' permission", "B. They are in a higher role in the hierarchy", "C. A sharing rule grants them access", "D. All of the above"],
    answer: "D. All of the above",
    explanation: "Record access can be opened up beyond OWD via: role hierarchy (inherits manager access), sharing rules (criteria or owner-based), manual sharing, teams (Account/Opportunity Teams), or system permissions like 'View All Data'."
  },
  {
    category: "MCQ",
    topic: "Security",
    question: "What does 'Grant Access Using Hierarchies' do when unchecked for a custom object?",
    options: ["A. Prevents any sharing rules from being created", "B. Stops the role hierarchy from opening up record access above OWD", "C. Removes all manual sharing on that object", "D. Disables field-level security for that object"],
    answer: "B. Stops the role hierarchy from opening up record access above OWD",
    explanation: "By default, managers in the role hierarchy can see records owned by their subordinates. Unchecking 'Grant Access Using Hierarchies' disables this for custom objects (cannot be disabled for standard objects)."
  },
  {
    category: "Tricky",
    topic: "Security",
    question: "What is the difference between 'View All' object permission and 'View All Data' system permission?",
    answer: "'View All' on an object lets the user see all records of THAT object regardless of sharing. 'View All Data' is a system permission that overrides ALL sharing restrictions across ALL objects.",
    explanation: "View All Data is typically reserved for system admins. View All on an object is a more targeted permission for specific objects."
  },
  {
    category: "Concepts",
    topic: "Security",
    question: "What is the difference between Criteria-Based and Owner-Based sharing rules?",
    answer: "Owner-Based: shares records owned by a specific group/role with another group/role. Criteria-Based: shares records that meet specific field criteria (e.g., Region = 'West') with a group/role, regardless of who owns them.",
    explanation: "Criteria-based sharing rules are more flexible and do not depend on record ownership. Both types can only OPEN UP access — they cannot restrict access below OWD."
  },

  // ── SALES & MARKETING ─────────────────────────────────────────
  {
    category: "MCQ",
    topic: "Sales & Marketing",
    question: "A Lead has been converted. Which standard records can be created during Lead conversion?",
    options: ["A. Contact and Opportunity only", "B. Account, Contact, and Case", "C. Account, Contact, and Opportunity", "D. Contact, Opportunity, and Campaign"],
    answer: "C. Account, Contact, and Opportunity",
    explanation: "Lead conversion creates an Account, Contact, and optionally an Opportunity. The original Lead record is marked as Converted. Cases are NOT created during lead conversion."
  },
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "What is a Campaign Influence?",
    answer: "Campaign Influence links Campaigns to Opportunities to track marketing's contribution to revenue. It shows which campaigns influenced a closed Opportunity.",
    explanation: "The primary campaign source is auto-set on Lead/Contact conversion. Multiple campaigns can influence an Opportunity with different percentage attributions."
  },
  {
    category: "MCQ",
    topic: "Sales & Marketing",
    question: "An Opportunity is stuck in the same stage. The sales manager wants the system to alert them after 30 days of inactivity. What is the BEST solution?",
    options: ["A. Create a validation rule", "B. Set up a Scheduled Flow to check for inactivity", "C. Enable Opportunity Insights in Einstein", "D. Create a workflow rule"],
    answer: "B. Set up a Scheduled Flow to check for inactivity",
    explanation: "A Scheduled-Triggered Flow can run daily and check if an Opportunity has been in the same stage for 30+ days, then send an alert or task. This is the recommended declarative approach."
  },
  {
    category: "Tricky",
    topic: "Sales & Marketing",
    question: "What happens to a Converted Lead if you try to convert it again?",
    answer: "You cannot re-convert an already converted Lead. The Convert button is replaced with a link to the associated Account, Contact, and Opportunity created during the original conversion.",
    explanation: "Converted Leads are read-only for conversion purposes. They are still visible in reports if you include converted leads."
  },

  // ── SERVICE & SUPPORT ─────────────────────────────────────────
  {
    category: "MCQ",
    topic: "Service & Support",
    question: "Which Case feature automatically sends an email response to a customer when their case is created via email?",
    options: ["A. Escalation rules", "B. Assignment rules", "C. Auto-response rules", "D. Email-to-Case"],
    answer: "C. Auto-response rules",
    explanation: "Auto-Response Rules send automatic email replies to customers when a Case (or Lead) is created. They are separate from Assignment Rules, which route the case to an agent."
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "What is the difference between Email-to-Case and On-Demand Email-to-Case?",
    answer: "Standard Email-to-Case: uses an agent installed behind your firewall to receive emails. On-Demand Email-to-Case: uses Salesforce's servers to process emails — no agent needed, but emails are forwarded to a Salesforce-provided address.",
    explanation: "On-Demand is simpler to set up. Standard Email-to-Case supports attachments over 25MB and keeps email traffic inside your network."
  },
  {
    category: "MCQ",
    topic: "Service & Support",
    question: "What is an Entitlement used for in Salesforce Service Cloud?",
    options: ["A. Tracking customer satisfaction scores", "B. Defining the level of support a customer is entitled to", "C. Routing cases to the correct queue", "D. Setting case escalation timers"],
    answer: "B. Defining the level of support a customer is entitled to",
    explanation: "Entitlements define the type and level of support a customer has agreed to (e.g., 8x5 phone support). Service Contracts group entitlements and have start/end dates. Milestones track required response times."
  },
  {
    category: "Tricky",
    topic: "Service & Support",
    question: "A case has been open for 4 hours and the SLA says first response must be within 2 hours. The milestone is violated. What happens next?",
    answer: "A Milestone Action (Violation Action) is triggered. This can send alerts, update fields, or trigger flows. The milestone is marked as Violated and remains on the case for tracking.",
    explanation: "Milestones have three action types: Warning (approaching deadline), Success (completed on time), and Violation (missed). All three should be configured for each milestone."
  },

  // ── PRODUCTIVITY & COLLABORATION ──────────────────────────────
  {
    category: "Concepts",
    topic: "Productivity",
    question: "What is the difference between Tasks and Events in Salesforce Activity tracking?",
    answer: "Tasks: to-do items with a due date, can be tracked as open/closed, not time-bound. Events: calendar-based, have a specific start/end time, appear on the user's calendar.",
    explanation: "Both Tasks and Events can be related to multiple records. Tasks have a 'Status' (Open, Completed) while Events have a time block."
  },
  {
    category: "MCQ",
    topic: "Productivity",
    question: "Which Salesforce feature allows users to follow records and get Chatter notifications when those records change?",
    options: ["A. Process Builder notification", "B. Record subscription via Chatter Follow", "C. Email alerts", "D. Custom notifications"],
    answer: "B. Record subscription via Chatter Follow",
    explanation: "Users can Follow a record in Chatter to receive feed updates when the record is modified. This is different from email alerts, which are triggered by automation rules."
  },
  {
    category: "Concepts",
    topic: "Productivity",
    question: "What is Einstein Activity Capture?",
    answer: "Einstein Activity Capture automatically logs emails and calendar events between Salesforce and your email/calendar system (e.g., Gmail, Outlook), associating them with relevant Salesforce records.",
    explanation: "It reduces manual data entry. However, activities logged by EAC are not stored in Salesforce long-term (they are kept in AWS by default) and are not included in standard reports unless synced."
  },

  // ── AGENTFORCE & AI ───────────────────────────────────────────
  {
    category: "MCQ",
    topic: "Agentforce",
    question: "What is Agentforce in Salesforce?",
    options: [
      "A. A customer service chatbot builder",
      "B. A platform for building and deploying autonomous AI agents that can take actions across Salesforce",
      "C. An analytics tool powered by Einstein",
      "D. A replacement for Flow Builder"
    ],
    answer: "B. A platform for building and deploying autonomous AI agents that can take actions across Salesforce",
    explanation: "Agentforce allows admins to create AI agents that understand natural language, reason over data, and take actions (like creating records, sending emails) autonomously or with human-in-the-loop approval."
  },
  {
    category: "Concepts",
    topic: "Agentforce",
    question: "What is a Topic in Agentforce?",
    answer: "A Topic defines the scope and purpose of an AI agent — what business domain it operates in, what instructions it follows, and which Actions it can take.",
    explanation: "Topics are like the 'job description' for an agent. An agent can have multiple topics (e.g., 'Order Management', 'Customer Support'). Each topic has instructions and a set of available actions."
  },
  {
    category: "MCQ",
    topic: "Agentforce",
    question: "Which of the following is an Action type available in Agentforce?",
    options: [
      "A. Apex class invocable method",
      "B. Flow (auto-launched)",
      "C. Prompt template",
      "D. All of the above"
    ],
    answer: "D. All of the above",
    explanation: "Agentforce Actions can be Flows (auto-launched), Apex invocable methods, Prompt Templates, or API calls. This flexibility lets admins build powerful agents without writing agent-specific code."
  },
  {
    category: "Tricky",
    topic: "Agentforce",
    question: "What is the difference between Einstein Copilot and Agentforce?",
    answer: "Einstein Copilot was the embedded AI assistant in the Salesforce UI. Agentforce is the next generation — it builds autonomous agents that can operate across channels (web, Slack, API) and take multi-step actions, not just assist users in the UI.",
    explanation: "Salesforce rebranded and evolved Copilot into the broader Agentforce platform. For the exam, understand that Agentforce = autonomous agents, Copilot = conversational assistant (now part of Agentforce)."
  },
  {
    category: "Concepts",
    topic: "Agentforce",
    question: "What is a Prompt Template in Salesforce?",
    answer: "A Prompt Template is a reusable, admin-configured template that combines merge fields from Salesforce records with instructions to generate AI responses. It is used by Einstein and Agentforce actions.",
    explanation: "Prompt Templates can reference record data (e.g., Account name, Case description) and are grounded in your Salesforce data to produce contextually relevant AI outputs."
  },

  // ── ADDITIONAL CARDS FROM ANKI DECK ──────────────────────────────

  // CONFIG & SETUP
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is the Organization ID in Salesforce?</b>",
    answer: "A <b>unique 15-character identifier</b> that identifies each Salesforce org. It is different across all environments (Dev, Test, Production) and is required when requesting support from Salesforce or AppExchange vendors.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>Where is the Organization ID found?</b>",
    answer: "<b>Setup \u2192 Company Information</b><br><br>It is also required when logging a support case with Salesforce.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the three types of Salesforce licenses?</b>",
    answer: "<ol><li><b>User Licenses</b> \u2013 Determines the baseline features available and which profiles can be assigned. Every user must have one.</li><li><b>Feature Licenses</b> \u2013 Grants access to additional features not in the standard user license (e.g. Marketing User).</li><li><b>Permission Set Licenses</b> \u2013 Gradually grants access to features not included in the user's user license.</li></ol>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What does the Default Locale setting control in Salesforce?</b>",
    answer: "The format of <b>Date, Time, Number, Phone Number, Name, and Address</b> fields.<br><br><i>Note: Users can override the company default locale in their own personal settings (My Settings \u2192 Personal \u2192 Language &amp; Time Zone).</i>",
    explanation: ""
  },
  {
    category: "Tricky",
    topic: "Config & Setup",
    question: "<b>What are the three levels of language support in Salesforce?</b>",
    answer: "<ol><li><b>Fully Supported</b> \u2013 Complete translation of all UI elements including admin pages.</li><li><b>End-User</b> \u2013 Basic translation covering user-facing content, not complex admin setup pages.</li><li><b>Platform-Only</b> \u2013 No built-in translation. Admins must manually translate buttons, labels, etc. (DIY).</li></ol><br><b>Warning:</b> A language in use by the company or any user cannot be deactivated.",
    explanation: ""
  },
  {
    category: "Tricky",
    topic: "Config & Setup",
    question: "<b>What is Multi-Currency in Salesforce and can it be reversed?</b>",
    answer: "Multi-Currency allows users to record amounts in different currencies and report/forecast using corporate or record currency.<br><br><b>\u26a0 It must be enabled on the Company Information page and CANNOT be reversed once enabled.</b>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is Advanced Currency Management?</b>",
    answer: "Advanced Currency Management allows <b>dated exchange rates</b> to be recorded to track the amounts at the time opportunities were closed.<br><br>This is used to prevent currency conversion distortions in historical opportunity data.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are Business Hours and Holidays used for in Salesforce?</b>",
    answer: "Business Hours and Holidays are used in calculations to determine when to <b>escalate a case</b> or when an <b>entitlement milestone</b> is reached.<br><br>Multiple Business Hour sets can be defined with one set as the default.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the two types of Fiscal Year in Salesforce?</b>",
    answer: "<ol><li><b>Standard Fiscal Year</b> \u2013 Default setting. Follows the Gregorian calendar (12 months). Admin can choose the starting month.</li><li><b>Custom Fiscal Year</b> \u2013 Does not follow the normal 12-month calendar structure. Must be enabled manually.<br>\u26a0 Cannot be reverted back to Standard once enabled.</li></ol>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the two categories of storage in Salesforce?</b>",
    answer: "<ol><li><b>Data Storage</b> \u2013 Used by records (Accounts, Contacts, Opportunities, etc.). Most records use ~2KB.</li><li><b>File Storage</b> \u2013 Used by Attachments, Documents, Files, Content, Chatter (including user photos), and Site.com assets.</li></ol><br>Storage limits are based on Salesforce Edition and number of user licenses.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>[MCQ] An administrator wants to eliminate duplicate picklist values across many objects. Which feature should they use?</b><br><br>A. Reusable Picklists<br>B. Global Value Sets<br>C. Master Picklists<br>D. Common Picklists",
    answer: "\u2705 <b>B. Global Value Sets</b><br><br><b>Explanation:</b> Global Value Sets allow a set of picklist values to be defined once and reused across multiple custom picklist fields on any object.<br><br>\u274c Common Picklists and Reusable Picklists do not exist as features.<br>\u274c Master Picklists is a feature used with Record Types to define all possible values.",
    explanation: ""
  },
  {
    category: "Tricky",
    topic: "Config & Setup",
    question: "<b>What is the difference between Freeze and Deactivate a user?</b>",
    answer: "<table><tr><th>Feature</th><th>Freeze</th><th>Deactivate</th></tr><tr><td>Login Blocked?</td><td>\u2705 Yes</td><td>\u2705 Yes</td></tr><tr><td>License Freed?</td><td>\u274c No</td><td>\u2705 Yes</td></tr><tr><td>Use Case</td><td>Temporary block (when deactivation is blocked by dependencies)</td><td>Standard offboarding</td></tr></table><br><b>Users can NEVER be deleted</b> in Salesforce to preserve audit trails.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>[MCQ] A sales rep has left the company. What should the admin do to prevent them from logging in?</b><br><br>A. Delete the user record<br>B. Delete the account record<br>C. Deactivate the user record<br>D. Deactivate the account record",
    answer: "\u2705 <b>C. Deactivate the user record</b><br><br><b>Explanation:</b> Salesforce does NOT allow deletion of users as it would create orphaned records. Deactivating the user prevents login and preserves all historical activity and records.<br><br>\u274c Account record refers to a business account (customer), not the login account.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the required fields when creating a new user in Salesforce?</b>",
    answer: "<ul><li>Last Name</li><li>Alias</li><li>Nickname</li><li>Email</li><li>Username</li><li>User License</li><li>Profile</li></ul><br><b>Note:</b> Usernames must be unique org-wide and in email format, but do NOT need to be a valid email address.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What does Login History show and where is it found?</b>",
    answer: "Login History shows details of past login attempts including login status (success/failure reason), timestamp, and method.<br><br><b>Location:</b> Related list on the User record OR Setup \u2192 Login History<br><br>Shows up to <b>20,000 records</b> for the past <b>6 months</b>. Can be downloaded as CSV or GZIP.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>[MCQ] All internal users are prompted to verify their identity when logging in from a new device. How can this behavior be modified?</b><br><br>A. Device Activation can be turned off for all users in settings<br>B. Device Activation can be deactivated for individual users on the user record<br>C. No \u2014 all users must always verify on a new device<br>D. Device Activation can be bypassed by adding trusted IP ranges",
    answer: "\u2705 <b>D. Device Activation can be bypassed by adding trusted IP ranges</b><br><br><b>Explanation:</b> If a user logs in from an IP address within a trusted IP range configured in the org, the device activation prompt is bypassed.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is the Security Health Check in Salesforce?</b>",
    answer: "A Salesforce tool that analyses your org's <b>security posture</b> by comparing settings against Salesforce-recommended baseline values.<br><br>Found at: <b>Setup \u2192 Security \u2192 Health Check</b><br><br>Score ranges:<br>- 90\u2013100% = Excellent<br>- 80\u201389% = Good<br>- 70\u201379% = Fair<br>- Below 70% = Poor / At Risk<br><br>Settings are grouped as High, Medium, Low risk and Informational.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>[MCQ] A Salesforce Administrator is setting up password policies. Which statements are CORRECT?</b><br><br>A. Default password length is 8 characters; can be changed from 3\u2013100<br>B. Lockout effective period can be set to 'Forever'<br>C. Password history enforcement can be modified<br>D. Password complexity always requires numbers, uppercase, lowercase, and special characters",
    answer: "\u2705 <b>B and C</b><br><br><b>Explanation:</b><br>\u2705 Lockout period options: 15 min, 30 min, 60 min, or <b>Forever</b>.<br>\u2705 Password history CAN be configured.<br>\u274c Minimum password length is limited to <b>5\u201350</b> characters (not 3\u2013100).<br>\u274c Complexity requirements vary by policy; special characters are not always mandatory.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is the difference between App Launcher, App Manager, and App Menu?</b>",
    answer: "<table><tr><th>Term</th><th>Who Uses It</th><th>Purpose</th></tr><tr><td><b>App Launcher</b></td><td>User</td><td>Top-left waffle icon. Users switch between apps and find items.</td></tr><tr><td><b>App Manager</b></td><td>Admin</td><td>Setup \u2192 Apps \u2192 App Manager. Create/edit apps, set branding, navigation, profiles.</td></tr><tr><td><b>App Menu</b></td><td>Admin</td><td>Setup \u2192 Apps \u2192 App Menu. Reorder or hide apps from the App Launcher.</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is a Sandbox in Salesforce?</b>",
    answer: "A <b>separate environment</b> that contains a copy of a production org used for development and testing. Ensures no disruption to production.<br><br>Four types:<br>- <b>Developer</b> \u2013 Smallest, metadata only, instant refresh<br>- <b>Developer Pro</b> \u2013 More storage, metadata only<br>- <b>Partial Copy</b> \u2013 Metadata + subset of data<br>- <b>Full Copy</b> \u2013 Complete copy of production including all data",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are Change Sets used for in Salesforce?</b>",
    answer: "Change Sets are used to <b>deploy metadata</b> between related sandbox and production orgs through a deployment connection.<br><br>- Created in the source org by adding metadata components<br>- Must be uploaded before deployment<br>- Validation of components is possible before deployment<br>- Inbound/Outbound change sets used for metadata deployment",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is the difference between Global Actions and Object-Specific Actions?</b>",
    answer: "<table><tr><th></th><th>Global Action</th><th>Object-Specific Action</th></tr><tr><td>Where Used</td><td>Any page (Home, Chatter, object pages)</td><td>Specific object pages only</td></tr><tr><td>Record Relationship</td><td>No automatic relationship to other records</td><td>Auto-associated with the parent record</td></tr><tr><td>Config</td><td>Setup \u2192 Global Actions</td><td>Object's page layout Publisher Actions</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is In-App Guidance in Salesforce?</b>",
    answer: "In-App Guidance allows admins to create <b>interactive prompts and walkthroughs</b> to guide users through onboarding or feature introduction.<br><br>Three prompt types: <b>Floating, Docked, Targeted</b><br><br>A <b>myTrailhead subscription</b> is required for users to be assigned permission to view more than 3 custom walkthroughs.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is a Pinned List View?</b>",
    answer: "A pinned list view is the specific view a user has chosen to see <b>every time they land on that object's tab</b>.<br><br>If no list view is pinned, Salesforce defaults to the last view the user accessed (Recently Viewed List).",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is Kanban View in Salesforce?</b>",
    answer: "Kanban View is a list view displayed as a <b>visual summary of records grouped by a status field</b> and summarised by a revenue field.<br><br>- Records are grouped and summarised<br>- <b>Opportunity deal change highlights</b> can show recent changes to amounts/close dates<br>- Available in <b>Lightning Experience Unlimited Edition only</b>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is Einstein Search in Salesforce?</b>",
    answer: "Einstein Search is <b>enabled by default</b> and provides:<br><ul><li><b>Search Personalisation</b> \u2013 Results based on most relevant records</li><li><b>Instant Actionable Results</b> \u2013 Suggested records and actions visible while typing</li><li><b>Natural Language Search (NLP)</b> \u2013 Common phrases automatically turned into filters</li></ul><br>Available in Essentials, Professional, Enterprise, Performance, and Unlimited editions.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the three types of search in Salesforce?</b>",
    answer: "<ol><li><b>Global Search</b> \u2013 Searches most objects across the org via the top search bar</li><li><b>List View Search</b> \u2013 Searches within a specific list view (limited to first 2,000 records)</li><li><b>Lookup Search</b> \u2013 Searches related records from a lookup field on a record</li></ol>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is the Lightning App Builder?</b>",
    answer: "A tool used to customise Lightning Apps via pages, components, and settings. Used for:<br><ul><li>Building and configuring <b>Lightning App, Home, and Record pages</b></li><li>Adding and configuring components</li><li>Setting <b>component visibility rules</b> (dynamic pages)</li><li>Managing app settings (branding, navigation)</li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>[MCQ] CoolRay Inc. has two divisions with different roles. A Lightning app exists for each division with publicly visible products. What customisation options allow users to distinguish the apps and access their division's products?</b><br><br>A. Use pinned list views for the two types of products<br>B. Customise the apps to be accessible based on the user's role<br>C. Set different brand images and colours for the two Lightning apps<br>D. Create sharing rules to prevent cross-division viewing",
    answer: "\u2705 <b>A and C</b><br><br><b>Explanation:</b><br>\u2705 Users can pin a list view so it's the default when accessing the tab.<br>\u2705 Lightning apps can have different brand images and nav bar colours.<br>\u274c App access is controlled by Profile, not Role.<br>\u274c Products are publicly visible, so sharing rules wouldn't restrict access.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the Sandbox types and their key differences?</b>",
    answer: "<table><tr><th>Type</th><th>Storage</th><th>Data</th><th>Refresh</th></tr><tr><td><b>Developer</b></td><td>200MB data / 200MB file</td><td>Metadata only</td><td>1 day</td></tr><tr><td><b>Developer Pro</b></td><td>1GB data / 1GB file</td><td>Metadata only</td><td>1 day</td></tr><tr><td><b>Partial Copy</b></td><td>5GB</td><td>Metadata + sample data</td><td>5 days</td></tr><tr><td><b>Full Copy</b></td><td>Same as production</td><td>All data</td><td>29 days</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is the Utility Bar in Lightning Experience?</b>",
    answer: "The Utility Bar provides easy access to common tools (Notes, History, Omni-Channel) from the <b>bottom</b> of the screen.<br><br>- Items appear at the bottom of the screen<br>- Can be positioned on the left or right<br>- Configured in the App Manager per Lightning App",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is the purpose of the Lightning Usage App?</b>",
    answer: "The Lightning Usage App monitors:<br>- <b>Adoption metrics</b> (daily active users in LEX vs. mobile app)<br>- <b>Page performance</b> (browser usage, slow pages)<br><br>Helps admins identify UX issues and improve page performance.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is Inline Editing in Salesforce?</b>",
    answer: "Inline Editing allows users to edit fields <b>directly on the record's detail page</b> without clicking a separate Edit button.<br><br>A <b>pencil icon</b> appears when hovering over an editable field. A <b>lock icon</b> appears for read-only fields.<br><br>Enabled via: Setup \u2192 User Interface",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the MFA methods available in Salesforce?</b>",
    answer: "Multi-Factor Authentication (MFA) verification methods:<br><ul><li>Email verification code</li><li>SMS/Text message code</li><li>Fingerprint/biometric scanner</li><li>Push notification via authenticator app (with timer)</li><li>Temporary verification code provided by admin</li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What key settings are configured in Company Information during initial org setup?</b><br>",
    images: ["Assets/content-images/Pasted image 20251028150603.png"],
    answer: "Company Information contains:<br><ul><li><b>Default Time Zone</b></li><li><b>Default Language and Locale</b></li><li><b>Currency</b></li><li><b>Data / File Storage</b></li><li><b>License Counts</b></li><li><b>API Usage</b></li><li><b>Organization ID</b></li></ul><br>Found at: <b>Setup \u2192 Company Information</b>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What does the Org ID look like and where is it found?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029143231.png"],
    answer: "The <b>Organization ID</b> is a unique <b>15-character identifier</b>.<br><ul><li>Found in <b>Setup \u2192 Company Information</b></li><li>Different for each org environment (Dev, Sandbox, Production)</li><li>Required when contacting Salesforce Support or AppExchange vendors</li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the three types of Salesforce Licenses and what does each do?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029145557.png", "Assets/content-images/Pasted image 20251029145615.png"],
    answer: "<ol><li><b>User License</b> \u2013 Baseline of features for the user. Every user must have one.</li><li><b>Feature License</b> \u2013 Grants access to additional features beyond the standard user license (e.g. Marketing User, Flow User).</li><li><b>Permission Set License</b> \u2013 Gradually grants access to specific features not included in the user's license.</li></ol>",
    explanation: ""
  },
  {
    category: "Tricky",
    topic: "Config & Setup",
    question: "<b>What is the difference between Org Time Zone and User Time Zone, and what issue can arise?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029160024.png"],
    answer: "<b>Org Time Zone:</b> Used as the default time zone for new users. Set in Company Information.<br><br><b>User Time Zone:</b> Users can override the org setting from My Settings.<br><br>\u26a0 <b>Warning:</b> If users have different time zones, they may see case open/close times at different hours. Date and Time fields always display in the <b>user's own time zone setting</b>.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>Where is the Default Org Time Zone set vs where does a user set their own?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029155429.png", "Assets/content-images/Pasted image 20251029155512.png"],
    answer: "<b>Org Default Time Zone:</b> Set at <b>Setup \u2192 Company Information</b><br><b>User Time Zone:</b> Set at <b>My Settings \u2192 Personal \u2192 Language &amp; Time Zone</b> (overrides the org default for that user)",
    explanation: ""
  },
  {
    category: "Tricky",
    topic: "Config & Setup",
    question: "<b>What happens when Multi-Currency is enabled in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029163126.png"],
    answer: "Multi-Currency allows users to record amounts in different currencies.<br><ul><li>Enabled on the <b>Company Information</b> page</li><li><b>\u26a0 CANNOT be reversed once enabled</b></li><li>Allows organisation to manage exchange rates</li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is Advanced Currency Management and what problem does it solve?</b><br>",
    images: ["Assets/content-images/p4oWu.png"],
    answer: "Advanced Currency Management stores <b>dated exchange rates</b> to track opportunity amounts at the time they were closed.<br><br>Solves the problem of historical opportunity values being recalculated using current exchange rates, which distorts historical pipeline data.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are Business Hours used for in Salesforce and how are they configured?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029201748.png"],
    answer: "Business Hours define the times when support users are available.<br><ul><li>Used in <b>Case Escalation Rules</b> and <b>Entitlement Milestones</b> time calculations</li><li>Multiple Business Hour sets can be created \u2014 one is set as Default</li><li>Holidays exclude time from escalation calculations</li><li>Business hours can be set per case record</li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>How do you change the Fiscal Year in Salesforce and what are the key warnings?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029202825.png"],
    answer: "Fiscal Year is changed at <b>Setup \u2192 Company Information \u2192 Edit \u2192 Fiscal Year</b><br><ul><li><b>Standard</b>: Follows Gregorian calendar (choose starting month)</li><li><b>Custom</b>: Does not follow the 12-month structure</li></ul><b>\u26a0 Warnings:</b><br>- Custom fiscal year impacts <b>forecasting, reports, and quotas</b><br>- If enabled, <b>cannot be reverted back to Standard</b>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>Where is Storage Usage viewed and what are the two types?</b><br>",
    images: ["Assets/content-images/Pasted image 20251029205450.png"],
    answer: "Storage usage is viewed at: <b>Setup \u2192 Data \u2192 Storage Usage</b><br><br><b>Data Storage:</b> Used by records (Accounts, Contacts, Leads, etc.)<br><b>File Storage:</b> Used by Attachments, Documents, Files, Content, Chatter (including user photos), and Site.com assets.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the two default record page view options in Lightning Experience?</b><br>",
    images: ["Assets/content-images/Pasted image 20251117212533.png", "Assets/content-images/Pasted image 20251117212656.png"],
    answer: "<b>Full View:</b> Classic single-column layout<br><b>Grouped View:</b> Fields and related lists grouped in collapsible sections<br><br>The default can be overridden per object by creating a <b>custom Lightning Record Page</b> in the <b>Lightning App Builder</b>.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What does the Hover Details feature show and what controls which fields appear?</b><br>",
    images: ["Assets/content-images/Pasted image 20251117214145.png"],
    answer: "Hover Details shows a <b>summary popup</b> when hovering over a record link.<br><br>The fields displayed are determined by the object's <b>Compact Layout</b> \u2014 the first few fields in the Compact Layout are used.<br><br>Enabled via: Setup \u2192 User Interface \u2192 Enable Hover Details",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What items can be added to a Lightning App Navigation Bar?</b><br>",
    images: ["Assets/content-images/Pasted image 20251117214525.png"],
    answer: "The Lightning App Navigation Bar can contain:<br>- Standard and Custom Objects<br>- Home<br>- Reports<br>- Dashboards<br>- Chatter (Feeds, People, Groups)<br>- Custom pages/tabs<br>- Visualforce pages<br>- Lightning components<br>- External URLs<br><br>Each user can reorder or add items (unless personalisation is disabled by admin).",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What can admins customise about a Lightning App through App Manager branding?</b><br>",
    images: ["Assets/content-images/Pasted image 20251117214851.png"],
    answer: "In App Manager, admins can customise:<br>- <b>Brand Image</b> (logo)<br>- <b>Nav Bar Colour</b><br>- <b>Navigation Items</b> (which tabs appear)<br>- <b>Utility Bar</b> items<br>- <b>Profiles</b> assigned to the app<br><br>Found at: Setup \u2192 Apps \u2192 App Manager \u2192 Edit App",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are Temporary Tabs in Lightning Experience?</b><br>",
    images: ["Assets/content-images/Pasted image 20251117215221.png"],
    answer: "Temporary Tabs open when a user clicks an item without a parent object in the nav bar.<br><br>- Identified by an <b>asterisk (*)</b> in the nav bar<br>- Can be made <b>permanent</b> by selecting \"Add to Nav Bar\"<br>- Help users access related info without leaving their current context",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What is In-App Guidance and what are the prompt types?</b><br>",
    images: ["Assets/content-images/Pasted image 20251117215921.png"],
    answer: "In-App Guidance creates interactive tours to guide users through onboarding or feature introductions.<br><br><b>Three prompt types:</b><br>- <b>Floating</b> \u2013 Repositionable prompt<br>- <b>Docked</b> \u2013 Fixed to one corner<br>- <b>Targeted</b> \u2013 Points to a specific UI element<br><br>Still images and GIFs can be added. A direct link can be sent to users.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What does the In-App Guidance Builder allow admins to create?</b><br>",
    images: ["Assets/content-images/Pasted image 20251117220241.png"],
    answer: "The In-App Guidance Builder canvas allows admins to create:<br>- <b>Single prompts</b> (one pop-up tip)<br>- <b>Walkthroughs</b> (multi-step guided tours)<br><br>Guidance can be assigned to a specific record type, a specific page/app, or any page/app. A <b>myTrailhead subscription</b> is required for users to view more than 3 custom walkthroughs.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What are the four Sandbox types and their differences?</b><br>",
    images: ["Assets/content-images/Pasted image 20251118214142.png", "Assets/content-images/Pasted image 20251118214153.png"],
    answer: "<table><tr><th>Type</th><th>Storage</th><th>Data</th><th>Refresh</th></tr><tr><td><b>Developer</b></td><td>200MB / 200MB</td><td>Metadata only</td><td>1 day</td></tr><tr><td><b>Developer Pro</b></td><td>1GB / 1GB</td><td>Metadata only</td><td>1 day</td></tr><tr><td><b>Partial Copy</b></td><td>5GB</td><td>Metadata + sample data</td><td>5 days</td></tr><tr><td><b>Full Copy</b></td><td>Same as Prod</td><td>All data</td><td>29 days</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Config & Setup",
    question: "<b>What tools are available for deploying metadata between orgs?</b><br>",
    images: ["Assets/content-images/Pasted image 20251118214543.png"],
    answer: "Metadata deployment tools include:<br><ul><li><b>Change Sets</b> \u2013 Admin-friendly, UI-based tool for related org deployment</li><li><b>Salesforce CLI</b> \u2013 Command-line tool for developers</li><li><b>Metadata API</b> \u2013 Programmatic deployment</li><li><b>Ant Migration Tool</b> \u2013 Java-based tool using Ant</li><li><b>AppExchange Packages</b> \u2013 For distributing managed apps</li></ul>",
    explanation: ""
  },

  // OBJECT MANAGER
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are the two types of object relationships in Salesforce?</b>",
    answer: "<b>1. Lookup Relationship (loose):</b><br>- Child can exist without parent (optional)<br>- No cascading delete<br>- Child has its own sharing rules<br>- No Roll-Up Summaries<br><br><b>2. Master-Detail Relationship (tight):</b><br>- Child REQUIRES parent (required field)<br>- Deleting parent deletes all children<br>- Child inherits parent's sharing/security<br>- Enables Roll-Up Summary Fields",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Roll-Up Summary Field?</b>",
    answer: "A Roll-Up Summary field is created on the <b>Master (Parent)</b> object to display an aggregate value from its related <b>Detail (Child)</b> records.<br><br>Requires a <b>Master-Detail relationship</b> (not available for Lookup).<br><br>Functions: <b>COUNT, SUM, MIN, MAX</b><br><br>Example: Total value of all Opportunities on an Account.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>[MCQ] An admin needs to track the total number of Job Applications linked to each Job record. Which field type should be created on the Job object?</b><br><br>A. Formula Field<br>B. Cross-Object Formula<br>C. Roll-Up Summary Field (Count)<br>D. Lookup Field",
    answer: "\u2705 <b>C. Roll-Up Summary Field (Count)</b><br><br><b>Explanation:</b> Roll-Up Summary fields aggregate child records (COUNT, SUM, MIN, MAX). A COUNT type would count all related Job Application records. This requires a Master-Detail relationship between Job and Job Application.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Junction Object?</b>",
    answer: "A Junction Object is a custom object used to create a <b>Many-to-Many relationship</b> between two objects.<br><br>It has two Master-Detail relationships \u2014 one to each parent object.<br><br>Example: A \"Teacher-Class\" junction object allows many Teachers to be related to many Classes and vice versa.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>In a Master-Detail relationship between a Standard Object and a Custom Object, which object must be the parent?</b>",
    answer: "The <b>Standard Object</b> must always be on the <b>master (parent)</b> side of the relationship when one of the objects is a standard object.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Hierarchical Relationship in Salesforce?</b>",
    answer: "A Hierarchical Relationship is a special type of lookup relationship that is <b>only available on the User object</b>. It allows a user record to link to another user record, creating a management hierarchy (e.g., Manager field on User).",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Schema Builder?</b>",
    answer: "Schema Builder is a tool in Salesforce that allows admins to <b>visually view and manage the data model</b>, including:<br><ul><li>Viewing objects, fields, and relationships visually</li><li>Creating objects, fields, and relationships</li></ul><br>Found in: Setup \u2192 Objects and Fields \u2192 Schema Builder",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is Lead Conversion in Salesforce?</b>",
    answer: "Lead Conversion creates:<br><ul><li>A new <b>Account</b> (or matches existing)</li><li>A new <b>Contact</b> (or matches existing)</li><li>Optionally a new <b>Opportunity</b> (can be skipped by ticking \"Do not create opportunity\")</li></ul><br>The opportunity name is <b>auto-generated</b>. The owner of the new records can be selected before converting.<br><br>Users need \"View and Edit Converted Leads\" permission to see converted leads.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are Record Types used for?</b>",
    answer: "Record Types allow different <b>picklist values, page layouts, and business processes</b> to be defined for the same object based on user profiles.<br><br>Used when one object serves multiple purposes (e.g., a Case for IT Support vs. Customer Complaints).<br><br>\u26a0 Record Types do NOT control or impact a user's sharing settings.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are the four Salesforce Business Processes?</b>",
    answer: "Business processes control the <b>Stage/Status picklist values</b> available on certain objects:<br><ol><li><b>Sales Process</b> \u2013 Opportunity (Stage)</li><li><b>Lead Process</b> \u2013 Lead (Status)</li><li><b>Support Process</b> \u2013 Case (Status)</li><li><b>Solution Process</b> \u2013 Solution (Status)</li></ol><br>A business process can be associated with multiple record types.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the Path feature in Salesforce?</b>",
    answer: "Path provides <b>visual guidance</b> to help users move through steps in a business process in Lightning Experience.<br><br>- Based on any existing picklist field<br>- A path can be defined per record type<br>- Must be placed on the page via Lightning App Builder<br>- Available for: Leads, Opportunities, Quotes, Contracts, Orders, and Custom Objects<br>- Lightning Experience and Salesforce mobile app only",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is Dynamic Forms in Salesforce?</b>",
    answer: "Dynamic Forms let admins customise record pages at the <b>individual field and section level</b> in the Lightning App Builder, with conditional visibility rules.<br><br>Instead of 10 different Page Layouts, you can use ONE page that adapts based on:<br>- Field values<br>- User attributes<br>- Device type<br><br>\u26a0 <b>Lightning-only feature.</b> Does NOT manage Related Lists or Buttons (use Dynamic Related Lists and Dynamic Actions for those).",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is Field History Tracking?</b>",
    answer: "Field History Tracking automatically records:<br>- Old value \u2192 New value<br>- Who made the change<br>- Date and time of the change<br><br>Limits: Up to <b>20 standard or custom fields</b> per object can be tracked.<br><br>History is viewable from the History related list on the record.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Global Value Set (Picklist)?</b>",
    answer: "A Global Value Set allows a set of picklist values to be <b>defined once and reused</b> across multiple custom picklist fields on any object.<br><br>\u26a0 Common Picklists and Reusable Picklists do not exist. Master Picklists is used with Record Types to define all possible picklist values.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Dependent Picklist?</b>",
    answer: "A Dependent Picklist is a picklist whose available values change based on the value selected in a <b>Controlling Field</b>.<br><br>- Controlling field can be a <b>Picklist</b> or a <b>Checkbox</b><br>- Only a custom picklist or multi-select picklist can be the <b>dependent field</b><br><br>Example: Selecting \"France\" in Country shows only French regions in the State field.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the difference between a Formula Field and a Roll-Up Summary Field?</b>",
    answer: "<table><tr><th></th><th>Formula Field</th><th>Roll-Up Summary</th></tr><tr><td>Direction</td><td>Looks UP to parent</td><td>Looks DOWN to children</td></tr><tr><td>Relationship</td><td>Lookup or Master-Detail</td><td>Master-Detail ONLY</td></tr><tr><td>Scope</td><td>One record (same or parent)</td><td>Many child records</td></tr><tr><td>Type</td><td>Calculated value</td><td>Aggregation (COUNT/SUM/MIN/MAX)</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What happens when a Custom Field is deleted in Salesforce?</b>",
    answer: "When a custom field is deleted:<br><ul><li>The field and its data are moved to a <b>temporary deleted state</b></li><li>Can be <b>undeleted (restored)</b> or permanently erased</li><li>After <b>15 days</b>, Salesforce automatically permanently deletes it</li></ul><br>\u26a0 Admin should be cautious about changing field types as <b>data loss may occur</b>.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>[MCQ] A company needs to store custom application configuration data that is deployed across environments via Change Sets. Which Salesforce feature is most appropriate?</b><br><br>A. Custom Objects<br>B. Custom Settings<br>C. Custom Metadata Types (CMT)<br>D. Custom Labels",
    answer: "\u2705 <b>C. Custom Metadata Types (CMT)</b><br><br><b>Explanation:</b> Custom Metadata Types are designed for application configuration data. Unlike Custom Settings, CMT records ARE included in Change Sets and packages, making them deployable across environments.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Multi-Select Picklist and what are its limitations?</b>",
    answer: "A Multi-Select Picklist allows users to select <b>multiple values</b> from a dropdown list.<br><br>Limitations:<br>- <b>Not supported</b> in formulas<br>- <b>Not supported</b> in reports (cannot group or sort by)<br>- <b>Not supported</b> in Roll-Up Summary field filters",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are Dynamic Actions in Salesforce?</b>",
    answer: "Dynamic Actions allow admins to <b>dynamically show or hide action buttons</b> on a record page based on the record's field values, user attributes, or device.<br><br>Helps keep the record page clean and context-relevant. Configured in the Lightning App Builder.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the Account to Contact relationship in Salesforce?</b>",
    answer: "Account and Contact have a <b>Lookup Relationship</b>, but it also behaves like a Master-Detail because:<br>- A Contact can be related to one Account by default<br>- \"Contact to Multiple Accounts\" setting can be enabled to allow a Contact to relate to multiple Accounts<br>- Deleting an Account deletes all related Contacts",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are the standard objects in Salesforce (CLOC acronym)?</b>",
    answer: "Standard Sales Cloud objects (CLOC):<br><ul><li><b>C</b>ampaigns</li><li><b>L</b>eads \u2192 Accounts, Contacts, Opportunities (via Lead Conversion)</li><li><b>O</b>pportunities (linked to Accounts)</li><li><b>C</b>ases (Service Cloud)</li></ul><br>Plus: <b>Accounts, Contacts</b> \u2014 the core of the CRM data model.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Compact Layout in Salesforce?</b>",
    answer: "A Compact Layout controls which fields are displayed in the <b>record highlights panel</b> (top of a record page) and in <b>hover details</b>.<br><br>The first few fields in the Compact Layout determine what appears when hovering over a record link.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the Page Layout used to control in Salesforce?</b>",
    answer: "A Page Layout controls the organisation and content of record detail and edit pages:<br><ul><li><b>Fields</b> (order, required, read-only)</li><li><b>Related Lists</b> (which related lists appear)</li><li><b>Buttons and Custom Links</b></li><li><b>Publisher Actions</b> (which actions appear)</li><li><b>Report Charts</b></li></ul><br>\u26a0 FLS (Profile) overrides page layout \u2014 if FLS hides a field, it won't show even if on the layout.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What does the Standard Object data model look like?</b><br>",
    images: ["Assets/content-images/Pasted image 20251031103547.png"],
    answer: "Standard Salesforce objects include:<br>- <b>Account</b> (parent of Contacts, Opportunities, Cases)<br>- <b>Contact</b> (person linked to Account)<br>- <b>Opportunity</b> (sales deal)<br>- <b>Case</b> (support request)<br>- <b>Lead</b> (unqualified prospect)<br>- <b>Campaign</b> (marketing initiative)<br><br>All come with Standard Fields and can be extended with Custom Fields.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the difference between Standard and Custom Objects?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123103506.png"],
    answer: "<table><tr><th>Standard Objects</th><th>Custom Objects</th></tr><tr><td>Pre-built by Salesforce</td><td>Created by the Administrator</td></tr><tr><td>Examples: Account, Contact, Lead, Opportunity, Case, Campaign</td><td>Anything: e.g., Job Candidate, Application, Vehicle</td></tr><tr><td>Used via Object Manager</td><td>Also managed via Object Manager</td></tr></table><br>Both come with Standard Fields and can be extended with Custom Fields.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the core Salesforce data model showing object relationships?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123103624.png"],
    answer: "Salesforce uses two main relationship types:<br>- <b>Lookup</b> (loose, optional parent)<br>- <b>Master-Detail</b> (tight, required parent, cascading delete)<br><br>Relationships allow related data to be viewed on records through <b>Related Lists</b>.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is Account's relationship to Contacts, Opportunities, and Cases?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123103955.png"],
    answer: "Account is the <b>parent object</b> of Contacts, Opportunities, and Cases.<br><ul><li>Account \u2192 Contact: Lookup (but behaves like Master-Detail)</li><li>Account \u2192 Opportunity: Lookup (deleting Account also deletes Opportunities)</li><li>Account \u2192 Case: Lookup</li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What does the standard Account-Contact-Opportunity-Case relationship look like?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123110303.png"],
    answer: "<b>Account</b> is at the centre, related to:<br>- Many <b>Contacts</b> (one Contact can relate to multiple Accounts if \"Contacts to Multiple Accounts\" is enabled)<br>- Many <b>Opportunities</b> (one-to-many)<br>- Many <b>Cases</b> (one-to-many)<br>- One <b>Contact</b> can relate to many Cases",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What records does Lead Conversion create?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123110410.png"],
    answer: "Lead Conversion creates:<br><ol><li><b>Account</b> (new or existing)</li><li><b>Contact</b> (new or existing)</li><li><b>Opportunity</b> (optional \u2014 can be skipped)</li></ol><br>The Opportunity name is auto-generated. Owner of new records can be selected before converting.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the Campaign \u2192 Campaign Members relationship?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123110537.png"],
    answer: "A <b>Campaign</b> can have many <b>Campaign Members</b>.<br><br>Campaign Members are the <b>Contacts or Leads</b> added to a campaign. Their status (e.g., \"Sent\", \"Responded\") tracks engagement.<br><br>The Lead Source field on Contacts/Leads can be linked back to the originating Campaign.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What does the full Sales Cloud relationship model look like?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123110804.png"],
    answer: "The main Sales Cloud relationships:<br>- <b>Campaign</b> \u2192 Campaign Members (Contacts/Leads)<br>- <b>Lead</b> \u2192 (converts to) Account + Contact + Opportunity<br>- <b>Account</b> \u2192 Contacts, Opportunities, Cases<br>- <b>Opportunity</b> \u2192 Opportunity Line Items (Products), Activities, Contacts",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is Schema Builder in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123110924.png"],
    answer: "Schema Builder is a <b>visual tool</b> for viewing and managing the Salesforce data model.<br><br>Allows admins to:<br>- View objects, fields, and relationships visually<br>- Create new objects, fields, and relationships directly on the canvas<br><br>Found at: Setup \u2192 Objects and Fields \u2192 Schema Builder",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are the types of object relationships in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123114302.png"],
    answer: "<ol><li><b>Lookup</b> \u2013 Loose link between objects. Child can exist without parent.</li><li><b>Master-Detail</b> \u2013 Tight link. Child requires parent. Cascading delete. Roll-Up Summaries enabled.</li><li><b>Many-to-Many</b> \u2013 Via a Junction Object with two Master-Detail relationships.</li><li><b>Hierarchical</b> \u2013 Only on User object (e.g., Manager field).</li><li><b>Self Relationship</b> \u2013 Lookup to the same object (e.g., Account \u2192 Parent Account).</li></ol>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What does a Lookup Relationship look like and what are its key characteristics?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123115122.png"],
    answer: "<b>Lookup Relationship:</b><br>- Loosely relates two objects<br>- Child CAN exist without a parent (optional field)<br>- No cascading delete<br>- Child has its own sharing/security rules<br>- No Roll-Up Summary fields<br><br>Example: Contact's \"Account Name\" field is a lookup to Account",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Hierarchical Relationship in Salesforce and where is it used?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123121025.png"],
    answer: "A Hierarchical Relationship is a special lookup that is <b>only available on the User object</b>.<br><br>It allows a User record to link to another User record (e.g., the Manager field), creating a management reporting hierarchy.<br><br>Used for org chart structures and manager-level approvals.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Self Relationship in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123121140.png"],
    answer: "A <b>Self Relationship</b> is a Lookup field on an object that points <b>back to the same object</b>.<br><br>Example: An Account has a \"Parent Account\" field (a lookup to another Account).<br><br>Allows hierarchical grouping within a single object.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Many-to-Many relationship and how is it created?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123123521.png", "Assets/content-images/Pasted image 20251123123506.png"],
    answer: "A <b>Many-to-Many</b> relationship means records from Object A can relate to multiple records of Object B and vice versa.<br><br>Created using a <b>Junction Object</b> \u2014 a custom object with <b>two Master-Detail relationships</b>, one to each parent object.<br><br>Example: Teachers (many) \u2194 Junction: Teacher-Class \u2194 Classes (many)",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is an overview of all Object Relationship types in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123123707.png"],
    answer: "<table><tr><th>Type</th><th>Objects</th><th>Key Feature</th></tr><tr><td>Lookup</td><td>Any</td><td>Optional parent, own sharing rules</td></tr><tr><td>Master-Detail</td><td>Any</td><td>Required parent, cascading delete, Roll-Up</td></tr><tr><td>Many-to-Many</td><td>Custom (Junction)</td><td>Two Master-Details on one object</td></tr><tr><td>Hierarchical</td><td>User only</td><td>Self-referencing management chain</td></tr><tr><td>External</td><td>External objects</td><td>Links to data outside Salesforce</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are Record Types used for in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123123844.png"],
    answer: "Record Types allow different:<br>- <b>Picklist Values</b> (only specific values from the Master Picklist)<br>- <b>Page Layouts</b> (different field layouts per type)<br>- <b>Business Processes</b> (different stage/status values)<br><br>Assigned to <b>Profiles</b>. A profile can have a default record type and additional available types.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are important considerations when using Record Types with business processes?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123123942.png"],
    answer: "<ul><li>Record types are linked to <b>Business Processes</b> (Sales, Lead, Support, Solution)</li><li>A business process must first be created before it can be assigned to a record type</li><li>Different picklist values can be set per record type</li><li>Page layouts can differ per record type</li><li><b>\u26a0 Record types do NOT impact sharing settings</b></li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>How are Record Types assigned to profiles?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123124025.png"],
    answer: "Record types are assigned at the <b>Profile</b> level:<br>- One record type per object can be set as the <b>Default Record Type</b><br>- Additional record types can be made <b>available</b> to the profile<br>- When creating a record, users with multiple available types are prompted to choose<br>- Users with only one assigned type skip the prompt",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What determines a user's access to Record Types?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123124145.png"],
    answer: "A user's access to record types is determined by their <b>Profile</b>.<br><br>The profile defines:<br>- Which record types are <b>available</b><br>- Which is the <b>default</b> record type<br><br>Permission Sets can also be used to grant access to additional record types.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>Does Record Type assignment affect sharing settings?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123124238.png"],
    answer: "<b>\u26a0 NO \u2014 Record Type assignment does NOT have any impact on users' sharing settings.</b><br><br>Record types only control what picklist values, page layouts, and business processes the user sees when working with a record. Sharing is controlled separately by OWD, Role Hierarchy, and Sharing Rules.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What happens when a Custom Field's data type is changed?</b><br>",
    images: ["Assets/content-images/Pasted image 20251124171330.png"],
    answer: "\u26a0 <b>Data loss may occur</b> when changing a custom field's type.<br><br>Some conversions are safe (e.g., Text \u2192 Text Area), but others will <b>delete existing data</b> in that field (e.g., converting a Picklist to a Text field).<br><br>Always check field type compatibility before changing. Salesforce will warn you before confirming.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is a Global Value Set in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251124171710.png"],
    answer: "A <b>Global Value Set</b> allows picklist values to be defined <b>once</b> and reused across multiple custom picklist fields on any object.<br><br>\u26a0 These do NOT exist: Common Picklists, Reusable Picklists.<br>\u26a0 <b>Master Picklist</b> = used with Record Types to define all possible values (not for reuse across objects).",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>How do Picklist values interact with Record Types?</b><br>",
    images: ["Assets/content-images/Pasted image 20251227205416.png"],
    answer: "Picklist values can be defined separately for each Record Type.<br><ul><li>Values do NOT need to be added to all record types</li><li>When picklist values are added, they are <b>active by default</b></li><li>Permissions for individual picklist values are <b>NOT controlled by Profiles</b></li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the difference between COUNT and SUM Roll-Up Summary fields?</b><br>",
    images: ["Assets/content-images/Pasted image 20251228003039.png"],
    answer: "<b>COUNT</b> \u2013 Counts the number of child records (e.g., number of Job Applications linked to a Job).<br><br><b>SUM</b> \u2013 Adds up a numeric field across all child records (e.g., total revenue from all related Opportunities).<br><br>Both require a <b>Master-Detail relationship</b>. FLS can control who sees these fields.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>How are different page layouts assigned via Record Types?</b><br>",
    images: ["Assets/content-images/Pasted image 20251228002812.png"],
    answer: "In the Record Type setup, you assign a <b>Page Layout per profile per record type</b>.<br><br>This means:<br>- Different profiles can see different layouts for the same record type<br>- The same profile can see different layouts for different record types<br><br>This is the main way to show/hide fields for different user groups.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What are the four Business Processes in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251227204714.png", "Assets/content-images/Pasted image 20251227204732.png"],
    answer: "Business Processes define which <b>Stage or Status picklist values</b> appear for a given object and record type:<br><ol><li><b>Sales Process</b> \u2192 Opportunity (Stage field)</li><li><b>Lead Process</b> \u2192 Lead (Status field)</li><li><b>Support Process</b> \u2192 Case (Status field)</li><li><b>Solution Process</b> \u2192 Solution (Status field)</li></ol><br>Each process can be linked to multiple Record Types.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Object Manager",
    question: "<b>What is the Path feature and what does it look like in Lightning Experience?</b><br>",
    images: ["Assets/content-images/Pasted image 20251228002957.png", "Assets/content-images/Pasted image 20251229213636.png"],
    answer: "Path provides a <b>visual guidance bar</b> showing which stage a record is in and what steps are needed to progress.<br><br>- Based on any existing picklist field<br>- Must be placed on the page via Lightning App Builder<br>- Key fields can be shown at each step<br>- Available on: Leads, Opportunities, Quotes, Contracts, Orders, Custom Objects<br>- <b>Lightning Experience and Salesforce Mobile only</b>",
    explanation: ""
  },

  // AUTOMATION
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What is the correct Order of Execution in Salesforce?</b>",
    answer: "When a record is saved, Salesforce processes in this order:<br><ol><li>Validation Rules</li><li>Assignment Rules</li><li>Auto-Response Rules</li><li>Workflow Rules (with immediate actions)</li><li>Escalation Rules</li></ol><br><b>Flow order (more detail):</b> Validation Rules \u2192 Duplicate Rules \u2192 Before-Save Flows \u2192 After-Save Flows \u2192 Assignment Rules \u2192 Workflow Rules \u2192 Escalation Rules",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>[MCQ] What is the correct sequence of rule processing when a record is created or updated?</b><br><br>A. Assignment rules \u2192 Workflow rules \u2192 Validation rules \u2192 Escalation rules<br>B. Validation rules \u2192 Assignment rules \u2192 Workflow rules \u2192 Escalation rules<br>C. Escalation rules \u2192 Validation rules \u2192 Workflow rules \u2192 Assignment rules<br>D. Escalation rules \u2192 Assignment rules \u2192 Workflow rules \u2192 Validation rules",
    answer: "\u2705 <b>B. Validation rules \u2192 Assignment rules \u2192 Workflow rules \u2192 Escalation rules</b><br><br><b>Full order:</b> Validation Rules \u2192 Assignment Rules \u2192 Auto-Response Rules \u2192 Workflow Rules \u2192 Escalation Rules",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What are the main Flow types in Salesforce?</b>",
    answer: "<ol><li><b>Screen Flow</b> \u2013 Displays screens to users for data input (interactive)</li><li><b>Record-Triggered Flow</b> \u2013 Runs automatically when a record is created/updated/deleted</li><li><b>Schedule-Triggered Flow</b> \u2013 Runs at a specified time on a batch of records</li><li><b>Auto-Launched Flow</b> \u2013 Runs without a UI (called from other automation, Apex, or REST API)</li><li><b>Platform Event-Triggered Flow</b> \u2013 Runs when a platform event is received</li></ol>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What element in a Flow displays a screen to collect user input?</b>",
    answer: "The <b>Screen Element</b> in Flow Builder displays a screen to the user running the flow, allowing them to enter information.<br><br>\u26a0 The <b>Assignment Element</b> is used to set variable values \u2014 it does NOT display a screen.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What is an Assignment Rule in Salesforce?</b>",
    answer: "An Assignment Rule automatically assigns a <b>Lead or Case</b> record to a specific user or queue when it meets defined criteria.<br><br>During record creation/update, users can tick \"Assign Using Active Assignment Rule\" to trigger the rule manually.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What is an Auto-Response Rule in Salesforce?</b>",
    answer: "Auto-Response Rules automatically send an <b>email acknowledgment</b> to a customer when a Lead or Case is submitted (e.g., via Web-to-Lead or Web-to-Case).<br><br>\u26a0 Auto-Response Rules email the <b>customer/contact</b>, NOT the record owner.<br>Use Flow for internal automated emails to team members.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What is an Escalation Rule in Salesforce?</b>",
    answer: "Escalation Rules automatically perform actions when a Case meets specific criteria (often time-based), such as:<br><ul><li>Reassign the case to a user or queue</li><li>Notify a user, case owner, or up to 5 email addresses</li></ul><br>Escalation uses <b>Business Hours</b> for time calculations.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What is an Approval Process in Salesforce?</b>",
    answer: "An Approval Process automates a business process that requires a record to be <b>approved by one or more users</b> before a final action is taken.<br><br>- Multiple approval steps possible<br>- Actions on Submit, Approve, Reject, and Recall<br>- Flow can submit records for approval (recommended declarative approach)",
    explanation: ""
  },
  {
    category: "Tricky",
    topic: "Automation",
    question: "<b>Why is Flow preferred over Workflow Rules and Process Builder?</b>",
    answer: "<ul><li><b>Workflow Rules</b> \u2013 Legacy (Salesforce Classic era), being retired</li><li><b>Process Builder</b> \u2013 Being removed/replaced by Flow</li><li><b>Flow</b> \u2013 Current standard tool; handles nearly all automation scenarios including screen interactions, complex logic, record updates, and more</li></ul><br>Salesforce recommends using standard declarative features (like Flow) before writing code (Apex).",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>[MCQ] A support agent needs to collect customer feedback using a flow before closing a case. Which flow element should be used?</b><br><br>A. Screen<br>B. Apex Action<br>C. Quick Action<br>D. Assignment",
    answer: "\u2705 <b>A. Screen</b><br><br><b>Explanation:</b> The Screen element displays a form/UI to the user running the flow, allowing them to enter customer feedback. The Assignment element sets variable values and has no UI component.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What is a Record-Triggered Flow? When does it NOT process existing records?</b>",
    answer: "A Record-Triggered Flow runs automatically when a record meeting the flow's criteria is <b>created, updated, or deleted</b>.<br><br>\u26a0 Activation of a record-triggered flow does <b>NOT</b> automatically process existing records that already meet the criteria. There is no \"Run on Existing Records\" option.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>What is the PRIORVALUE function in Validation Rules?</b>",
    answer: "<b>PRIORVALUE(fieldname)</b> returns the previous value of a field before the current save.<br><br>Used to prevent further edits once a record reaches a certain status.<br><br>Example: Block edits when Status is already \"Archived\" \u2192 <code>ISPICKVAL(Status, \"Archived\") &amp;&amp; ISCHANGED(Status)</code> won't work; use <b>PRIORVALUE</b> instead.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Automation",
    question: "<b>[MCQ] Which automation tool should be used to automatically send a survey invitation to a lead when they are created?</b><br><br>A. Workflow Rule<br>B. Process Builder<br>C. Flow Builder with 'Send Survey Invitation' action<br>D. Assignment Rule",
    answer: "\u2705 <b>C. Flow Builder with 'Send Survey Invitation' action</b><br><br><b>Explanation:</b> Flow Builder can use a native 'Send Survey Invitation' action type to automatically email survey invitations to leads, contacts, or users. Using a native Flow action is preferred over relying on outbound messages or third-party systems. Workflow Rules are legacy/deprecated.",
    explanation: ""
  },

  // DATA & ANALYTICS
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What are the two main data import tools in Salesforce?</b>",
    answer: "<b>Data Import Wizard:</b><br>- For end users and admins (Setup menu)<br>- Max 50,000 records<br>- Accounts, Contacts, Leads, Solutions, Campaign Members, Custom Objects<br>- Insert, Update, Upsert<br><br><b>Data Loader:</b><br>- Admins only (desktop app, must be downloaded)<br>- Up to 150 million records<br>- All objects including attachments<br>- Insert, Update, Upsert, Delete, Hard Delete, Export",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>[MCQ] An admin needs to import 80,000 custom object records. Which tool should be used?</b><br><br>A. Data Import Wizard<br>B. Reports<br>C. Data Loader<br>D. Mass Transfer Records Tool",
    answer: "\u2705 <b>C. Data Loader</b><br><br><b>Explanation:</b> Data Import Wizard is limited to 50,000 records. Data Loader can handle up to 150 million records and supports all objects including custom objects. It must be downloaded as a desktop application.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is Upsert in Data Loader?</b>",
    answer: "Upsert is a Data Loader operation that:<br>- <b>Updates</b> an existing record if a match is found (using an ID or External ID)<br>- <b>Inserts</b> a new record if no match is found<br><br>Used when you're not sure if records already exist in Salesforce.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is Hard Delete in Data Loader?</b>",
    answer: "Hard Delete permanently removes records <b>without sending them to the Recycle Bin</b>.<br><br>Requirements: The <b>\"Use Bulk API\"</b> setting must be enabled after installing Data Loader.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is an External ID in Salesforce?</b>",
    answer: "An External ID is a custom field that stores a <b>unique identifier from an external system</b>. Used for matching records when importing or integrating data.<br><br>- Field type must be: <b>Text, Number, or Email</b><br>- Up to <b>25 custom fields</b> per object can be External IDs<br>- Recommended to enable the \"Unique\" setting",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What are the four Report Formats in Salesforce?</b>",
    answer: "<ol><li><b>Tabular</b> \u2013 Simple list of rows. No grouping or subtotals. Like a spreadsheet.</li><li><b>Summary</b> \u2013 Grouped by rows with subtotals. Good for totals by category.</li><li><b>Matrix</b> \u2013 Grouped by both rows and columns. Good for comparing two dimensions.</li><li><b>Joined</b> \u2013 Multiple report blocks in a single view across different objects/report types.</li></ol><br>Report format is NOT explicitly selected; it auto-adapts based on groupings configured.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is a Custom Report Type?</b>",
    answer: "A Custom Report Type allows admins to define:<br>- The <b>primary object</b> (up to 4 levels: primary + 3 related objects)<br>- Which <b>fields</b> are available in the report builder<br>- Whether related records are required (\"with\" reports) or optional (\"with or without\")<br><br>Used when standard report types don't include the objects or fields needed.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is a Bucket Field in reports?</b>",
    answer: "A Bucket Field groups report values into named ranges/categories without creating a custom formula field.<br><br>Limits:<br>- Up to <b>5 bucket fields</b> per report<br>- Up to <b>20 buckets</b> per bucket field<br>- Supported types: Number, Percent, Currency, Picklist, Text<br>- Cannot be used in Joined reports",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is Conditional Highlighting in Salesforce Reports?</b>",
    answer: "Conditional Highlighting allows <b>summarised values</b> to be colour-coded based on defined thresholds.<br><br>Helps users quickly identify high/low/normal values in summary and matrix reports.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is a Reporting Snapshot?</b>",
    answer: "A Reporting Snapshot stores report data <b>on a scheduled basis</b> in a custom object, enabling historical/trend analysis.<br><br>Components needed:<br>- A <b>source report</b> (Tabular or Summary)<br>- A <b>custom object</b> to store the data<br><br>Schedule: Daily, Weekly, or Monthly",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is the Running User on a Dashboard?</b>",
    answer: "The Running User determines <b>whose security context is used</b> to display data on the dashboard.<br><br>- If set to a specific user (e.g., admin), all viewers see the same data regardless of their own permissions<br>- If set to \"Logged-in User,\" each person sees data they have access to<br>- Dynamic dashboards use the logged-in user's context",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>[MCQ] When can dashboards be refreshed?</b><br><br>A. When a user clicks 'Refresh'<br>B. The dashboard refresh frequency can be set per dashboard<br>C. Every time someone accesses the home page<br>D. Every day automatically",
    answer: "\u2705 <b>A and B</b><br><br><b>Explanation:</b> Dashboards can be <b>manually refreshed</b> by clicking Refresh, or <b>scheduled</b> to refresh daily, weekly, or monthly per dashboard settings.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>How does the Sharing Model affect Reports?</b>",
    answer: "Security and sharing settings are applied when reports are run:<br><br>- <b>Public OWD</b> (Read/Write or Read Only) \u2013 All users see the same records<br>- <b>Private OWD</b> \u2013 Users only see records they have access to<br><br>\u26a0 Page layouts do NOT impact record visibility in reports.<br>A user can report on a field if FLS grants read access, even if the field is NOT on their page layout.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is the Mass Transfer Records tool used for?</b>",
    answer: "The Mass Transfer Records tool transfers multiple records from one user to another.<br><br>When transferring Accounts:<br>- Notes, Contacts, Opportunities, and open activities of the old owner are transferred<br><br>When transferring Leads:<br>- All open activities of the old owner are transferred<br><br>\u26a0 Does NOT support all standard objects; Data Loader is an alternative.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What objects can be Mass Deleted in Salesforce?</b>",
    answer: "Accounts, Activities, Cases, Contacts, Leads, Solutions, Products, and Reports can be mass deleted.<br><br>- Related records are also deleted<br>- Filters can be used to find records<br>- Optional: permanently bypass the Recycle Bin<br>- Data Loader is a native alternative for mass deletion",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is the Data Export Service in Salesforce?</b>",
    answer: "The Data Export Service performs <b>automated scheduled exports</b> of complete Salesforce org data in CSV files.<br><br>- Can include files, documents, images, and attachments<br>- Can run <b>immediately, weekly, or monthly</b><br>- Found in: Setup \u2192 Data \u2192 Data Export",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is the Recycle Bin storage limit?</b>",
    answer: "The Recycle Bin can store up to <b>25 times your data storage limit</b> in MB, with a minimum of 250MB. Records are permanently deleted automatically after <b>15 days</b>.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is the difference between UI-Required and Metadata-Required fields?</b>",
    answer: "<table><tr><th></th><th>UI Required</th><th>Metadata Required</th></tr><tr><td>Where configured</td><td>Page Layout Editor</td><td>Field-Level settings</td></tr><tr><td>Applies to API/data imports?</td><td>\u274c No</td><td>\u2705 Yes</td></tr><tr><td>Can be removed from layout?</td><td>\u2705 Yes</td><td>\u274c No</td></tr><tr><td>Scope</td><td>UI only</td><td>Everywhere in the system</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What is Conditional Formatting vs Conditional Highlighting in Salesforce?</b>",
    answer: "<b>Conditional Highlighting</b> (Reports) \u2013 Colours <b>summarised values</b> in summary/matrix reports based on thresholds.<br><br><b>Conditional Formatting</b> (List Views/Records) \u2013 Applies colour coding to <b>fields on list views or record pages</b> based on field values.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>[MCQ] An admin needs to report on Accounts WITHOUT any related Opportunities. Which report filter type should be used?</b><br><br>A. Row Limit Filter<br>B. Standard Filter<br>C. Cross Filter<br>D. Field-to-Field Filter",
    answer: "\u2705 <b>C. Cross Filter</b><br><br><b>Explanation:</b> Cross Filters display records based on whether or not they have child records of a particular type. This allows you to find \"Accounts WITHOUT Opportunities.\"",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What report export formats are supported?</b>",
    answer: "Reports can be exported as:<br>- <b>Details Only</b> \u2192 .xls, .xlsx, or .csv<br>- <b>Formatted Report</b> \u2192 .xlsx only<br><br>\u26a0 Joined reports are <b>always</b> exported as Formatted Reports (.xlsx).",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What are the steps involved in using the Data Import Wizard?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122185718.png"],
    answer: "Data Import Wizard steps:<br><ol><li>Select the object (Account, Contact, Lead, etc.)</li><li>Choose what to do (Insert / Update / Upsert)</li><li>Select matching criteria (for duplicate detection)</li><li>Upload the CSV file</li><li>Map CSV columns to Salesforce fields</li><li>Review and start the import</li></ol><br>Limited to <b>50,000 records</b>. Accesed from Setup menu.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What additional settings can be configured during a Data Import Wizard job?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122185944.png"],
    answer: "Import settings include options to:<br>- <b>Trigger assignment rules</b> (for Cases/Leads)<br>- <b>Trigger workflow rules and processes</b> (optional)<br>- <b>Choose matching logic</b> for duplicate detection<br>- Map relationships to other records using IDs<br><br>These settings help control automation behaviour during import.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What are the steps when using Data Loader for Insert/Update/Upsert?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122191844.png"],
    answer: "Data Loader operation steps:<br><ol><li>Select operation (Insert, Update, Upsert, Delete, Export)</li><li>Authenticate / log in</li><li>Select the object</li><li>Browse to the CSV file</li><li>Map CSV columns to Salesforce fields</li><li>Run the operation</li><li>Review success/error logs</li></ol>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What are the steps to import articles using the Import Articles Tool?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122192836.png"],
    answer: "Import Articles tool steps:<br><ol><li>Prepare a .zip file containing: .csv article file + .properties file (+ any HTML/images)</li><li>Navigate to: Setup \u2192 Knowledge \u2192 Import Articles</li><li>Upload the .zip</li><li>Map fields</li><li>Review and complete the import</li></ol><br>Multiple article record types can be imported at once in Lightning Knowledge.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What records are also transferred when reassigning account ownership?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122194028.png"],
    answer: "When transferring Account ownership, the following are also transferred:<br>- <b>Contacts</b><br>- <b>Open Opportunities</b><br>- <b>Notes</b><br>- <b>Contracts</b> (Draft + In Approval Process)<br>- <b>Orders</b> (Draft status)<br>- <b>Attachments</b><br>- <b>Open Activities</b>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What related records are deleted during a Mass Delete?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122194441.png"],
    answer: "When Mass Deleting, related records are also deleted. For example:<br>- Deleting <b>Accounts</b> \u2192 also deletes related Contacts, Opportunities, and Cases<br>- Deleting <b>Leads</b> \u2192 also deletes related activities<br><br>\u26a0 Use filters to target specific records. Records can optionally bypass the Recycle Bin permanently.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What happens to deleted records and what are the Recycle Bin storage limits?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122194710.png", "Assets/content-images/Pasted image 20251122194831.png"],
    answer: "Deleted records go to the <b>Recycle Bin</b>.<br><br>- Can be <b>Restored</b> (undeleted) or <b>Permanently Deleted</b><br>- Records auto-delete from Recycle Bin after <b>15 days</b><br>- Storage limit: <b>25x your data storage in MB</b> (minimum 250MB)<br><br>Data Loader \"Export All\" includes Recycle Bin records.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What data quality and management tools are available in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122195146.png"],
    answer: "Data quality tools include:<br>- <b>Validation Rules</b> \u2013 Enforce data standards on save<br>- <b>Duplicate Rules &amp; Matching Rules</b> \u2013 Prevent/manage duplicates<br>- <b>Data Import Wizard</b> \u2013 Guided import with duplicate detection<br>- <b>Data Loader</b> \u2013 Bulk operations<br>- <b>Reports</b> \u2013 Identify missing or inconsistent data<br>- <b>Mass Transfer / Mass Delete</b> \u2013 Bulk record management",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What are Big Objects in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251122195651.png"],
    answer: "<b>Big Objects</b> allow massive amounts of data to be stored in Salesforce (up to 1 million records in standard Big Objects; billions with purchased capacity).<br><br>Used for archiving historical data that doesn't need to be in the main data storage.<br><br>Can be queried using SOQL with some limitations.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What determines the report format in Salesforce and what are the four types?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123172137.png"],
    answer: "Report format is <b>NOT explicitly selected</b> \u2014 it adapts automatically based on groupings configured:<br><ol><li><b>Tabular</b> \u2013 No groupings, simple list</li><li><b>Summary</b> \u2013 Row groupings (subtotals per group)</li><li><b>Matrix</b> \u2013 Row AND column groupings</li><li><b>Joined</b> \u2013 Multiple blocks, different report types</li></ol>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What are the Report Formats and when does Salesforce use each?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123173220.png"],
    answer: "<table><tr><th>Format</th><th>When Used</th></tr><tr><td><b>Tabular</b></td><td>No groupings \u2192 just columns</td></tr><tr><td><b>Summary</b></td><td>At least one row grouping added</td></tr><tr><td><b>Matrix</b></td><td>Row AND column groupings added</td></tr><tr><td><b>Joined</b></td><td>Multiple report blocks added</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What tools are available in the Report Builder for customising data?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123173303.png"],
    answer: "Report Builder tools:<br>- <b>Filters</b> \u2013 Standard, Cross, Row Limit, Field-to-Field<br>- <b>Bucket Fields</b> \u2013 Group values into named ranges (max 5 per report)<br>- <b>Summary Fields</b> \u2013 SUM, AVG, MIN, MAX, MEDIAN on numeric columns<br>- <b>Row-Level Formulas</b> \u2013 Custom calculation per row (only 1 per report)<br>- <b>Conditional Highlighting</b> \u2013 Colour-code summarised values",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What chart types are available in Salesforce Reports?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123184055.png"],
    answer: "Available chart types:<br>- <b>Bar</b> \u2013 Compare distance/time (single grouping, horizontal)<br>- <b>Column</b> \u2013 Relative counts/comparisons (vertical)<br>- <b>Line</b> \u2013 Changes over time<br>- <b>Donut</b> \u2013 Proportion of groups in a whole<br>- <b>Funnel</b> \u2013 Flow through ordered process stages<br>- <b>Scatter</b> \u2013 Data grouped by summarised values<br>- <b>Stacked Bar/Column</b> \u2013 Multi-grouping breakdowns",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>What components make up a Salesforce Dashboard?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123185904.png"],
    answer: "Dashboards are built from three elements:<br>- <b>Source Reports</b> \u2013 The report whose data a widget displays<br>- <b>Widgets</b> \u2013 Chart/Table (from Summary/Matrix/Tabular reports), Rich Text, or Image<br>- <b>Filters</b> \u2013 Allow dashboard viewers to narrow the data without editing<br><br>Data is shown as of the last refresh.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Data & Analytics",
    question: "<b>How can Dashboards be refreshed and what are the options?</b><br>",
    images: ["Assets/content-images/Pasted image 20251123190208.png"],
    answer: "<b>Manual:</b> Click \"Refresh\" button on the dashboard<br><br><b>Scheduled:</b> Set a recurring schedule per dashboard \u2014 options are <b>Daily, Weekly, or Monthly</b><br><br>You can also subscribe to receive a dashboard snapshot email on schedule.",
    explanation: ""
  },

  // SECURITY & SHARING
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is the Org-Wide Default (OWD)?</b>",
    answer: "OWD is the <b>baseline access level</b> for every record of a specific object across the entire org. It is the <b>most restrictive</b> layer of the sharing model.<br><br>- <b>Private</b> \u2013 Users can only see records they own<br>- <b>Public Read Only</b> \u2013 All users can see all records, but only owners can edit<br>- <b>Public Read/Write</b> \u2013 All users can see and edit all records<br><br>OWD can only <b>restrict</b> access, never grant beyond what sharing rules/role hierarchy provide.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is the Role Hierarchy in Salesforce?</b>",
    answer: "The Role Hierarchy provides <b>vertical access</b> to records. Users automatically get access to all records owned by users <b>below</b> them in the hierarchy.<br><br>- Vertical = up the hierarchy (manager sees subordinate's records)<br>- Does NOT work horizontally across branches<br>- \"Grant Access Using Hierarchies\" can be disabled for custom objects",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What are Sharing Rules in Salesforce?</b>",
    answer: "Sharing Rules create <b>exceptions to the OWD</b> to open up record access <b>horizontally</b> for groups of users.<br><br>Two types:<br>- <b>Owner-based</b> \u2013 Share records owned by specific users/roles<br>- <b>Criteria-based</b> \u2013 Share records meeting specific field criteria<br><br>\u26a0 Sharing Rules can NEVER be more restrictive than the OWD.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>[MCQ] A Salesforce Administrator needs to make exceptions for Account record access in a private sharing model. Which features can be used? (Select all that apply)</b><br><br>A. Account Teams<br>B. Manual Sharing<br>C. Sharing Rules<br>D. Sharing Exception Rules<br>E. Field Permission",
    answer: "\u2705 <b>A, B, and C</b><br><br><b>Explanation:</b><br>\u2705 Account Teams, Manual Sharing, and Sharing Rules can all grant access to Account records.<br>\u274c \"Sharing Exception Rules\" does not exist in Salesforce.<br>\u274c Field Permissions (FLS) controls field visibility, not record access.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What can be included in a Public Group?</b>",
    answer: "A Public Group can include:<br><ul><li>Individual <b>Users</b></li><li><b>Roles</b> (and optionally subordinates)</li><li>Other <b>Public Groups</b></li><li>Users assigned to specific <b>Territories</b></li></ul><br>\u26a0 <b>Profiles and Permission Sets CANNOT be included</b> in a Public Group \u2014 they control what users can DO, not which records are shared.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is the difference between Object-Level and Record-Level Access?</b>",
    answer: "<b>Object-Level Access</b> (controlled by Profile/Permission Set):<br>- WHETHER a user can interact with an object at all<br>- Permissions: Read, Create, Edit, Delete, View All, Modify All<br><br><b>Record-Level Access</b> (controlled by OWD, Role Hierarchy, Sharing Rules):<br>- WHICH specific records of that object the user can see<br>- Only comes into play AFTER object-level access is granted",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>[MCQ] A user has Read object-level access to Accounts. What records will they see?</b><br><br>A. Records owned by the user and users in the same role<br>B. All account records<br>C. Depends on the sharing model and the user's role<br>D. Only records owned by the user",
    answer: "\u2705 <b>C. Depends on the sharing model and the user's role</b><br><br><b>Explanation:</b> Object-level access (Profile) determines IF a user can see the object. The OWD and Role Hierarchy determine WHICH specific records they can access. These are two separate layers.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>[MCQ] Which features control record-level sharing in Salesforce? (Select all that apply)</b><br><br>A. Profiles<br>B. OWD Settings<br>C. Permission Sets<br>D. Role Hierarchy<br>E. Sharing Rules",
    answer: "\u2705 <b>B, D, and E</b><br><br><b>Explanation:</b><br>\u2705 OWD, Role Hierarchy, and Sharing Rules all control which records users can access.<br>\u274c Profiles and Permission Sets control object-level and field-level access, not record sharing.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is Field-Level Security (FLS)?</b>",
    answer: "FLS controls the <b>visibility and editability of individual fields</b> on an object. Configured via Profiles and Permission Sets.<br><br>Settings: <b>Visible</b> (read + edit), <b>Read-Only</b>, or <b>Hidden</b><br><br>Example: A user may have Read access to the Lead object but cannot see the \"Rating\" field if FLS hides it.<br><br>Even if FLS allows seeing a field, the user must also have Record-Level access to see the record itself.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is the difference between a Profile and a Permission Set?</b>",
    answer: "<table><tr><th></th><th>Profile</th><th>Permission Set</th></tr><tr><td>Assignment</td><td>Every user MUST have exactly one</td><td>Can have zero or many per user</td></tr><tr><td>Purpose</td><td>Baseline access definition</td><td>Extends access BEYOND the profile</td></tr><tr><td>Direction</td><td>Defines the base</td><td>Additive only (cannot restrict)</td></tr><tr><td>Modify Standard</td><td>Standard Profiles CANNOT be modified</td><td>N/A</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is Login Access Policy in Salesforce?</b>",
    answer: "Login Access Policies are org-wide settings that control:<br><ul><li>Whether admins can log in as any user</li><li>How long users can grant login access</li><li>Whether users can see the \"Grant Access\" options</li></ul><br><b>Admin \"Login as Any User\":</b> Setup \u2192 Login Access Policies \u2192 Enable<br><b>User-Granted Access:</b> User Settings \u2192 Grant Account Login Access",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>[MCQ] A user has a profile with Create, Edit, and Delete on Leads. OWD for Leads is Private. The user has a role with subordinates. What is the user's access to leads owned by other users?</b><br><br>A. Profile settings override sharing \u2014 full edit access to all leads<br>B. No access to leads owned by other users<br>C. Profile settings override OWD \u2014 edit access to all leads<br>D. Access to leads owned by users below them in the role hierarchy",
    answer: "\u2705 <b>D. Access to leads owned by users below them in the role hierarchy</b><br><br><b>Explanation:</b> Profile permissions determine object-level access (CAN I see any Lead?). OWD + Role Hierarchy determine WHICH specific Lead records. With Private OWD and a role hierarchy, the user sees their own leads PLUS leads owned by users below them.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>[MCQ] In a private sharing model, which features can grant access to Account records? (Select all that apply)</b><br><br>A. Account Teams<br>B. Manual Sharing<br>C. Sharing Rules<br>D. Sharing Exception Rules<br>E. Field Permissions",
    answer: "\u2705 <b>A, B, and C</b><br><br><b>Explanation:</b><br>\u2705 Account Teams, Manual Sharing, and Sharing Rules can all grant record-level access.<br>\u274c \"Sharing Exception Rules\" does not exist.<br>\u274c Field Permissions (FLS) control field visibility, not record sharing.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is the difference between a Role and a Territory in Salesforce?</b>",
    answer: "<table><tr><th></th><th>Role</th><th>Territory</th></tr><tr><td>Based on</td><td>Organisational/reporting hierarchy</td><td>Geographic or customer segmentation</td></tr><tr><td>Record Access</td><td>Vertical (users see records of users below)</td><td>Defines record access for assigned region</td></tr><tr><td>Sharing Rules</td><td>Roles can be targets of sharing rules</td><td>Territories can also be targets</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Security & Sharing",
    question: "<b>What is \"Controlled by Parent\" OWD for a child object?</b>",
    answer: "\"Controlled by Parent\" means the child object's record access is <b>determined by the parent record's sharing settings</b> (used in Master-Detail relationships).<br><br>If a user has access to the parent, they have the same level of access to all child records. The child cannot have its own sharing rules.",
    explanation: ""
  },

  // SALES & MARKETING
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "<b>What is Lead Auto-Response Rules in Salesforce?</b>",
    answer: "Auto-Response Rules automatically send an <b>email to the lead/customer</b> when they submit a form (e.g., Web-to-Lead).<br><br>\u26a0 This emails the <b>customer</b>, not the record owner.<br>For internal emails to team members, use <b>Flow</b>.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "<b>What objects and records are created during Lead Conversion?</b>",
    answer: "Lead Conversion creates:<br><ol><li><b>Account</b> (new or match existing)</li><li><b>Contact</b> (new or match existing)</li><li><b>Opportunity</b> (optional \u2014 can be skipped)</li></ol><br>The opportunity name is <b>auto-generated</b>. The owner of created records can be selected before conversion.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "<b>What is a Campaign in Salesforce?</b>",
    answer: "Campaigns are used to <b>track marketing efforts and ROI</b>.<br><br>- Campaigns can have a <b>hierarchy</b> (parent/child campaigns)<br>- Campaign Members are the Contacts or Leads associated with a Campaign<br>- Lead Source on Contacts/Leads can be tied to the originating Campaign",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "<b>What is Web-to-Lead in Salesforce?</b>",
    answer: "Web-to-Lead generates an <b>HTML form</b> that can be added to a company website to capture Lead information directly into Salesforce.<br><br>Validation rules are run before records are created via Web-to-Lead. If validation fails, no record is created.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "<b>What are Opportunity Teams in Salesforce?</b>",
    answer: "Opportunity Teams allow multiple users to collaborate on a single Opportunity, each with a defined role (e.g., Sales Manager, Executive Sponsor).<br><br>- Each user can define a <b>default Opportunity Team</b> in personal settings<br>- The opportunity owner or someone above in the hierarchy can add the default team",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "<b>[MCQ] The Sales Managers want to use Pipeline Inspection. Which capabilities are features of Pipeline Inspection? (Select all that apply)</b><br><br>A. Filters can be applied to narrow the view<br>B. Tiered Einstein opportunity scores are displayed with key factors<br>C. The Pipeline tab shows changes to opportunities in forecast categories over time<br>D. KPIs for sales pipelines are displayed as metrics at the top",
    answer: "\u2705 <b>A, B, and D</b><br><br><b>Explanation:</b><br>\u2705 Pipeline Inspection supports custom filters, Einstein Deal Insights (ML scoring), and KPI metrics.<br>\u274c The 'Pipeline' tab tracking forecast category changes over time is not a standard Pipeline Inspection feature \u2014 that's more related to Forecast views.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Sales & Marketing",
    question: "<b>What is Sales Dialer in Salesforce?</b>",
    answer: "Sales Dialer allows making and receiving calls, adding call notes, and logging call information directly from Salesforce.<br><br>- Available in <b>Lightning Experience only</b><br>- Single-click calling from phone number fields<br>- Supports call recording (<b>no additional plugin required</b>)",
    explanation: ""
  },

  // SERVICE & SUPPORT
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What are the Case Creation methods in Salesforce?</b>",
    answer: "Cases can be created:<br><ul><li><b>Manual</b> \u2013 Entered directly in the CRM</li><li><b>Email-to-Case</b> \u2013 Cases created from customer emails to a support address</li><li><b>Web-to-Case</b> \u2013 HTML form on company website generates cases</li><li><b>Auto-Response</b> \u2013 Triggered by online form submissions</li><li><b>Omni-Channel</b> \u2013 Routes work to agents automatically</li></ul>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is Email-to-Case in Salesforce?</b>",
    answer: "Email-to-Case generates cases from customer emails sent to a company's support email address.<br><br>- Multiple <b>Routing Addresses</b> can be configured<br>- Each routing address can have its own default owner, priority, and origin<br><br><b>On-Demand Email-to-Case:</b><br>- No installation required<br>- Smaller attachment size but higher daily limits",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is Web-to-Case?</b>",
    answer: "Web-to-Case generates an <b>HTML web form</b> that can be placed on a company website to capture support cases directly into Salesforce.<br><br>reCAPTCHA verification can be enabled for Web-to-Case forms.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is a Queue in Salesforce?</b>",
    answer: "Queues are a <b>holding place for unassigned records</b> (Cases, Leads, Orders, etc.) that team members can pick up.<br><br>- Queue members can be users, roles, or public groups<br>- A <b>List View is automatically created</b> when a queue is created for Cases, Leads, or custom objects<br>- Members can accept ownership by clicking the 'Accept' button",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>[MCQ] A Salesforce Administrator creates a queue for Cases. What happens automatically?</b><br><br>A. A sharing rule is created for the queue members<br>B. A list view is automatically created for the queue<br>C. An escalation rule is triggered<br>D. The cases are assigned to all queue members",
    answer: "\u2705 <b>B. A list view is automatically created for the queue</b><br><br><b>Explanation:</b> When a queue is created for Cases, Leads, or custom objects, Salesforce automatically creates a corresponding list view for that queue.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is Omni-Channel in Salesforce?</b>",
    answer: "Omni-Channel automatically routes work (cases, chats, etc.) to the <b>most available and qualified support agents</b>.<br><br>- Found in the Service Console <b>Utility Bar</b><br>- <b>Omni Supervisor</b> lets supervisors monitor agent workloads, status, and capacity<br>- Supports routing for: voice calls, chats, messaging, cases, leads, and custom objects",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What are Macros in Salesforce Service Cloud?</b>",
    answer: "Macros are <b>sets of instructions</b> that automate common repetitive tasks in the Service Console (e.g., updating a case field, sending an email template).<br><br>\u26a0 Macros are limited to <b>front-end execution</b>. For background automation or complex logic, use <b>Flow</b>.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is Case Merge in Salesforce?</b>",
    answer: "Case Merge allows agents to merge <b>up to 3 duplicate cases</b> into one master case record.<br><br>- Must be enabled under Setup \u2192 Case Merge<br>- Duplicate cases are added to the \"Merged Cases\" related list on the master record<br>- Soft deletion of duplicates is optional",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is a Support Process in Salesforce?</b>",
    answer: "A Support Process defines the <b>stages (Status picklist values)</b> a case goes through in its life cycle.<br><br>- Multiple support processes with different Status values can be created<br>- Assigned to Case Record Types<br>- An Approval Process can be added for certain stages",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What are Case Teams in Salesforce?</b>",
    answer: "Case Teams allow support users to <b>collaborate on closing cases</b>.<br><br>- Roles must first be created in <b>Case Team Roles</b> setup<br>- Role access levels: Private, Read Only, Read/Write, Visible in Customer Portal<br>- Predefined case teams allow users to quickly add frequent collaborators",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is a Service Console in Salesforce?</b>",
    answer: "The Service Console is a <b>unified user interface for support agents</b> that allows them to access multiple records and tools on a single screen, enabling efficient case management.<br><br>Features include multi-tab navigation, case feeds, knowledge articles, and Omni-Channel integration.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is the Case Management life cycle in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121183909.png"],
    answer: "The Case life cycle is managed through three phases:<br><table><tr><th>Case Creation</th><th>Case Management</th><th>Case Collaboration</th></tr><tr><td>Manual, Email-to-Case, Web-to-Case, Auto-Response, Assignment Rules</td><td>Support Processes, Service Console, Milestones, Knowledge</td><td>Case Feed, Case Comments, Case Emails</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What features does the Service Console support?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121192002.png", "Assets/content-images/Pasted image 20251121192444.png"],
    answer: "The Service Console provides a unified UI for support agents with:<br>- <b>Multi-tab navigation</b> (open many records simultaneously)<br>- <b>Split-view / sidebar panels</b><br>- <b>Case Feed</b> for collaboration<br>- <b>Knowledge</b> articles panel<br>- <b>Omni-Channel</b> widget in utility bar<br>- <b>Macros</b> for repeatable actions<br>- <b>Activity Timeline</b>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What are Case Comments and who can see them?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121193414.png"],
    answer: "Case Comments are stored on the case under the Related Items section.<br><br>- <b>Internal comments</b> \u2013 Visible only to internal users (not customers)<br>- <b>Public comments</b> \u2013 Tick the \"Public\" checkbox before saving; visible to customers via Community/Portal<br><br>An email alert is sent to the case owner when a Contact adds a new comment.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What are Case Assignment Rules and how are they triggered?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121194947.png"],
    answer: "Case Assignment Rules automatically assign Cases to a <b>user or queue</b> based on defined criteria.<br><br>Triggered when:<br>- A case is <b>created</b> (if assignment rule checkbox is enabled)<br>- User manually ticks <b>\"Assign Using Active Assignment Rule\"</b> before saving a case",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is Omni-Channel and how does the Omni Supervisor work?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121195238.png", "Assets/content-images/Pasted image 20251121195249.png"],
    answer: "<b>Omni-Channel</b> routes work to the most qualified available agents automatically. Found in the Service Console Utility Bar.<br><br><b>Omni Supervisor:</b><br>- Monitors agent workloads and capacity in real-time<br>- Shows agent online/offline status duration<br>- Manages queues, skills, and work assignments<br>- The Agents tab shows capacity and assigned work",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is Omni-Channel Flow and what routing does it support?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121195416.png", "Assets/content-images/Pasted image 20251121195452.png"],
    answer: "<b>Omni-Channel Flow</b> brings Omni-Channel routing functionality inside a Salesforce Flow.<br><br>Supports routing for:<br>- Voice calls, Chats, Messaging<br>- Cases, Leads, Custom Objects<br><br>For non-real-time objects, a <b>subflow</b> can invoke the Omni-Channel flow routing.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What do Auto-Response Rules do and when do they run?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121195621.png"],
    answer: "Auto-Response Rules send an automated <b>email to the customer/contact</b> when a Case is created (e.g., via Web-to-Case or Email-to-Case).<br><br>Used for acknowledgment emails like \"We've received your request, Case #12345.\"<br><br>\u26a0 This emails the <b>customer</b>, NOT the case owner.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is the difference between Auto-Response Rules and Email Alerts?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121195648.png"],
    answer: "<table><tr><th></th><th>Auto-Response Rule</th><th>Email Alert (via Flow/Workflow)</th></tr><tr><td>Recipient</td><td>Customer/Contact who submitted</td><td>Any user or email address</td></tr><tr><td>Trigger</td><td>Case or Lead creation via form</td><td>Any record event (create/update)</td></tr><tr><td>Purpose</td><td>Acknowledgment to customer</td><td>Internal or external notification</td></tr></table>",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What actions can Escalation Rules perform?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121195742.png"],
    answer: "Escalation Rules can:<br>- <b>Reassign</b> a case to a user or queue<br>- <b>Notify a user</b> via email<br>- <b>Notify the case owner</b> via email<br>- <b>Notify up to 5 selected email addresses</b><br><br>Time is calculated using <b>Business Hours</b>. Multiple escalation rules can be set up with different criteria and actions.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What is Web-to-Case in Salesforce?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121195910.png"],
    answer: "Web-to-Case generates an <b>HTML form</b> to be placed on a company website so customers can submit support cases directly into Salesforce.<br><br>- reCAPTCHA can be enabled to prevent bot submissions<br>- Case Assignment Rules and Auto-Response Rules fire on submission<br>- Validation rules run before the record is created",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>How is Email-to-Case configured and what settings are available per Routing Address?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121200051.png"],
    answer: "Multiple <b>Routing Addresses</b> can be configured for Email-to-Case.<br><br>Per routing address, you can set:<br>- <b>Default Case Owner</b> (user or queue)<br>- <b>Default Priority</b><br>- <b>Default Case Origin</b> (e.g., Email)<br><br>\u26a0 Must set up a verified Default No-Reply org-wide email address for enhanced email security.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>How are Case Teams configured and what are the access level options?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121200315.png"],
    answer: "Case Team setup:<br>1. Create <b>Case Team Roles</b> in Setup (defines the role names and access)<br>2. Add teams to the Case page layout via Related Lists<br><br>Role Access Levels:<br>- <b>Private</b> \u2013 No additional access<br>- <b>Read Only</b> \u2013 View the case<br>- <b>Read/Write</b> \u2013 Edit the case<br>- <b>Visible in Customer Portal</b> \u2013 Visible to portal users",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>How does case ownership transfer work?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121200342.png"],
    answer: "Cases can be assigned to a <b>user or a queue</b>.<br><br>When transferring ownership:<br>- An assignment rule checkbox may appear \u2014 check it to apply the active assignment rule automatically<br>- A dialogue box prompts selection of the new owner (user or queue)<br>- Can also use the <b>Change Owner</b> quick action or update the <b>Case Owner</b> field directly",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What are Case List Views and how do Queues create them?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121200554.png", "Assets/content-images/Pasted image 20251121200623.png"],
    answer: "Case Views (List Views) can be defined to filter cases by criteria (e.g., all open cases assigned to a queue).<br><br>When a <b>Queue</b> is created:<br>- A <b>list view is automatically created</b> for that queue<br>- Queue members (users, roles, public groups) can click <b>Accept</b> to self-assign a case from the queue",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Service & Support",
    question: "<b>What are Macros in Salesforce and what actions can they perform?</b><br>",
    images: ["Assets/content-images/Pasted image 20251121200855.png", "Assets/content-images/Pasted image 20251121200953.png"],
    answer: "<b>Macros</b> are sets of instructions that automate repetitive tasks in the Service Console.<br><br>Macros can perform actions on the Case Feed such as:<br>- Sending an email using a template<br>- Updating a case field<br>- Posting a Chatter message<br>- Submitting a case for approval<br><br>\u26a0 Macros are for <b>front-end use</b> only. Use Flow for background automation.",
    explanation: ""
  },

  // PRODUCTIVITY
  {
    category: "Concepts",
    topic: "Productivity",
    question: "<b>What is Chatter in Salesforce?</b>",
    answer: "Chatter is Salesforce's <b>internal collaboration tool</b> allowing users to:<br><ul><li>Post updates and comments on records or groups</li><li>Share files</li><li>Follow records, users, and groups</li><li>Use @mentions to notify specific users</li></ul><br>Rich text (bold, italic, images, hyperlinks) can be enabled in Chatter settings.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Productivity",
    question: "<b>What is AppExchange in Salesforce?</b>",
    answer: "AppExchange is Salesforce's official <b>cloud marketplace</b> where customers can find, try, and install applications and consulting services that extend Salesforce functionality.<br><br>Two types of packages:<br>- <b>Managed Package</b> \u2013 Published app with locked code (upgradeable by publisher)<br>- <b>Unmanaged Package</b> \u2013 Code is accessible and modifiable (not upgradeable)",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Productivity",
    question: "<b>What is Einstein Activity Capture (EAC)?</b>",
    answer: "Einstein Activity Capture (EAC) automatically <b>logs emails and calendar events</b> to related Salesforce records, reducing manual data entry for sales reps.<br><br>Available in Sales Cloud and Service Cloud.",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Productivity",
    question: "<b>What is Gmail Integration in Salesforce?</b>",
    answer: "Gmail Integration allows users to log emails from Gmail to related Salesforce records (Contacts, Leads, Person Accounts).<br><br>Users can use the global search in the Gmail Integration pane to find any person record in Salesforce.<br><br>\u26a0 If Einstein Activity Capture has emails <b>disabled</b>, users can still manually click \"Log Email.\"",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Productivity",
    question: "<b>What is Feed Tracking in Salesforce (Chatter)?</b>",
    answer: "Feed Tracking allows changes to specific fields on a record to be <b>posted in the Chatter feed</b> on that record, so users following it are notified of updates.<br><br>\u26a0 Feed filters are no longer supported in Lightning Experience.",
    explanation: ""
  },

  // AGENTFORCE
  {
    category: "Concepts",
    topic: "Agentforce",
    question: "<b>What is the Einstein Trust Layer?</b>",
    answer: "The Einstein Trust Layer ensures <b>data privacy and security</b> when using AI features in Salesforce:<br><br>- <b>Data Masking</b> \u2013 Hides PII (names, SSNs) before data is sent to LLMs<br>- <b>Zero Retention</b> \u2013 The LLM does NOT store your Salesforce data<br>- <b>Permissions</b> \u2013 Agentforce is managed via Permission Sets; check the Agent User's permissions if it cannot perform actions",
    explanation: ""
  },
  {
    category: "Concepts",
    topic: "Agentforce",
    question: "<b>What are the key Einstein features for the Salesforce Admin exam?</b>",
    answer: "<table><tr><th>Feature</th><th>Function</th></tr><tr><td>Einstein Activity Capture</td><td>Auto-logs emails/events to records</td></tr><tr><td>Einstein Lead Scoring</td><td>Predicts which leads will convert</td></tr><tr><td>Einstein Opportunity Scoring</td><td>Predicts likelihood of Closed Won</td></tr><tr><td>Einstein Bots</td><td>Automated customer service chatbots</td></tr><tr><td>Einstein Next Best Action</td><td>Recommends offers/actions at the right time</td></tr><tr><td>Einstein Prediction Builder</td><td>Admins build custom AI models (no code)</td></tr></table>",
    explanation: ""
  },

  // GENERAL
  {
    category: "Concepts",
    topic: "General",
    question: "<b>What is the Salesforce Certified Administrator exam structure?</b>",
    answer: "<b>Exam ID:</b> ADM-201<br><b>Questions:</b> 60 scored + 5 unscored pretest (65 total)<br><b>Time:</b> 105 minutes<br><b>Passing Score:</b> 65% (39/60 correct)<br><b>Cost:</b> $200 (retake $100)<br><br><b>Domain Weightings (2025):</b><br>- Data & Analytics Management: 17%<br>- Configuration & Setup: 15%<br>- Object Manager & App Builder: 15%<br>- Automation: 15%<br>- Sales & Marketing: 10%<br>- Service & Support: 10%<br>- Productivity & Collaboration: 10%<br>- Agentforce AI: 8%",
    explanation: ""
  },
];

// Export for use in script.js
if (typeof module !== 'undefined') module.exports = FLASHCARDS;