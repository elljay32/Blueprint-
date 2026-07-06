import { JointInfo, WoodInfo, DesignFactor, DtpTerm, LineStandard, SafetySign, QuizQuestion } from "./types";

export const woodworkJoints: JointInfo[] = [
  {
    id: "cross-halving",
    name: "Cross Halving Joint",
    type: "Frame/Halving Joint",
    difficulty: "Beginner",
    description: "A simple wood joint where two pieces of wood overlap, with half the thickness of each cut away so they sit flush together.",
    pros: [
      "Very easy to mark out and cut",
      "Sits completely flush on both sides",
      "Good for basic framing"
    ],
    cons: [
      "Not very strong on its own",
      "Relies heavily on glue and screws for mechanical strength"
    ],
    commonUses: "Internal frames, light structures, S1-S3 grid projects.",
    toolsNeeded: ["Steel Rule", "Try Square", "Marking Gauge", "Tenon Saw", "Bevel Edge Chisel", "Mallet"],
    steps: [
      "Mark the width of overlapping wood onto both pieces using a try square and pencil.",
      "Set a marking gauge to exactly half the thickness of the wood.",
      "Scribe the half-depth line on the edges of both pieces.",
      "Saw down to the gauge line on the waste side using a Tenon Saw.",
      "Chisel out the waste wood using a bevel-edged chisel and mallet, checking for a flat surface.",
      "Test the joint fit and glue/clamp if flush."
    ]
  },
  {
    id: "mortise-tenon",
    name: "Mortise and Tenon Joint",
    type: "Framing Joint",
    difficulty: "Advanced",
    description: "One of the strongest woodwork joints, consisting of a projecting pin (tenon) on one piece inserted into a matching rectangular hole (mortise) in another.",
    pros: [
      "Extremely strong and rigid",
      "Large surface area for glue bonding",
      "Excellent resistance to twisting"
    ],
    cons: [
      "Requires high precision and time to make",
      "Challenging to chisel a perfect rectangular mortise"
    ],
    commonUses: "Table legs, heavy doors, high-quality furniture framing.",
    toolsNeeded: ["Mortise Gauge", "Tenon Saw", "Mortise Chisel", "Mallet", "Try Square"],
    steps: [
      "Mark out the mortise length using a pencil and try square.",
      "Use a mortise gauge set to the width of your mortise chisel to scribe parallel lines on the wood.",
      "Chisel out the mortise hole to the correct depth, removing waste carefully with a mallet.",
      "Mark the tenon on the second piece of wood.",
      "Cut the tenon shoulders using a Tenon Saw, then cut the cheeks in a vice.",
      "Fit the tenon into the mortise, adjusting cheeks slightly if too tight."
    ]
  },
  {
    id: "dowel-joint",
    name: "Dowel Joint",
    type: "Carcase & Framing Joint",
    difficulty: "Intermediate",
    description: "A joint that uses cylindrical wooden pegs (dowels) inserted into pre-drilled matching holes to join two pieces of wood.",
    pros: [
      "Strong and hidden from view",
      "Relatively quick to prepare with jigs",
      "Adds neat alignment"
    ],
    cons: [
      "If holes are slightly misaligned, the whole joint will be warped",
      "Requires careful depth stop measuring"
    ],
    commonUses: "Cabinet assembly, manufactured board joining, shelving.",
    toolsNeeded: ["Dowel Jigs", "Pillar Drill (or Hand Drill with depth stop)", "Dowels", "Wood Glue", "Try Square"],
    steps: [
      "Mark corresponding center lines across the joining edges of both pieces of wood.",
      "Clamp the pieces or use a dowel jig to ensure drills are perfectly vertical and aligned.",
      "Drill holes to half the length of the dowel plus 2mm (for excess glue) using a depth stop.",
      "Insert wood glue into the holes.",
      "Push or tap the wooden dowels into one side.",
      "Align and press the joining piece onto the protruding dowels, clamping firmly."
    ]
  },
  {
    id: "dovetail-joint",
    name: "Dovetail Joint",
    type: "Carcase Joint",
    difficulty: "Advanced",
    description: "An iconic joint famous for its resistance to being pulled apart. It features interlocking wedge-shaped fingers called 'pins' and 'tails'.",
    pros: [
      "Incredibly strong mechanical connection",
      "Highly decorative and visually beautiful",
      "Cannot be pulled apart in one direction even without glue"
    ],
    cons: [
      "Very difficult to cut accurately by hand",
      "Requires expert marking skills"
    ],
    commonUses: "Drawer fronts, high-end storage boxes, jewelry cases.",
    toolsNeeded: ["Sliding Bevel", "Dovetail Saw", "Copingsaw (for waste)", "Bevel Edge Chisel", "Marking Knife"],
    steps: [
      "Mark out the thickness of the matching piece on the face of the first board.",
      "Scribe the angles of the tails using a sliding bevel set to 1:6 or 1:8 ratio.",
      "Saw down the lines with a fine Dovetail Saw.",
      "Remove the bulk of the waste with a coping saw, then chisel back precisely to the shoulder line.",
      "Transfer the tail positions onto the end grain of the second board using a marking knife.",
      "Saw and chisel the pins, then test and tap the interlocking joint flush."
    ]
  }
];

export const woods: WoodInfo[] = [
  {
    id: "scots-pine",
    name: "Scots Pine (Redwood)",
    category: "Softwood",
    properties: "Straight-grained, relatively easy to work, contains knots and natural resin. Pale yellow to reddish-brown.",
    uses: "Construction timber, roof trusses, general joinery, S1-S3 workshop models.",
    sustainability: "Highly sustainable. Grows relatively fast in managed European and Scottish forests."
  },
  {
    id: "european-oak",
    name: "European Oak",
    category: "Hardwood",
    properties: "Heavy, dense, extremely strong and durable. Highly resistant to rot and moisture. Beautiful distinct grain.",
    uses: "High-end furniture, boat building, flooring, heavy timber framing.",
    sustainability: "Slow-growing, meaning it is more expensive and requires careful forest certification (FSC)."
  },
  {
    id: "beech",
    name: "European Beech",
    category: "Hardwood",
    properties: "Hard, tough, close-grained, and extremely resistant to abrasion. Light pinkish-brown. Prone to warping if exposed to moisture.",
    uses: "Wooden toys, workshop workbench tops, kitchen utensils, tool handles.",
    sustainability: "Grows abundantly in Europe, sustainably managed."
  },
  {
    id: "medium-density-fibreboard",
    name: "MDF (Medium Density Fibreboard)",
    category: "Manufactured Board",
    properties: "Smooth, flat, uniform surface with no grain or knots. Made from wood fibers compressed with adhesive. Easy to cut but produces hazardous fine dust.",
    uses: "Flat-pack furniture, veneered cabinets, interior shelving, laser cutting models.",
    sustainability: "Uses recycled wood fibers and timber waste, but resin binder contains chemicals (must be worked in well-ventilated rooms with masks)."
  },
  {
    id: "birch-plywood",
    name: "Birch Plywood",
    category: "Manufactured Board",
    properties: "Very strong, rigid, and resistant to splitting. Made of multiple thin veneers glued together at 90-degree angles to each other (cross-lamination).",
    uses: "High-strength drawers, skateboards, structural panels, model making.",
    sustainability: "Efficient use of log timber, highly durable and long-lasting."
  }
];

export const designFactors: DesignFactor[] = [
  {
    id: "ergonomics",
    name: "Ergonomics & Anthropometrics",
    question: "How does the product fit the human user?",
    description: "Ergonomics focuses on making products easy and comfortable to use. Anthropometrics is the study of human body measurements (e.g. hand size, sitting height) used to size products for target users (using 5th to 95th percentiles).",
    examples: [
      "The contoured grip on a hand tool sized to fit average hand widths.",
      "The adjustable height of a school desk to fit a wide range of S1-S6 pupils."
    ],
    tips: "When designing, always state the specific measurements of the user you are accommodating (e.g. S1 hand span) and how your product dimensions correspond."
  },
  {
    id: "aesthetics",
    name: "Aesthetics",
    question: "How does the product look and appeal to the senses?",
    description: "Aesthetics relates to the visual and sensory appeal of a product. This includes color, shape, form, texture, proportion, symmetry, and style (e.g., minimalist, retro, organic).",
    examples: [
      "Using bright contrasting colors on S1-S3 products to make them look playful and modern.",
      "A sleek wooden clock with seamless curves and brushed metal hands for an elegant look."
    ],
    tips: "Don't just say a product 'looks nice'. Use professional terminology like 'harmonious proportions', 'contrasting textures', or 'geometric form'."
  },
  {
    id: "function",
    name: "Function & Performance",
    question: "What does the product do and how well does it do it?",
    description: "Function is the primary purpose of a product (what it is designed to achieve). Performance includes durability, ease of maintenance, and how well it stands up to its intended load or environment.",
    examples: [
      "A storage rack must safely hold 10 folders without bending or tipping.",
      "A garden torch must be wind-resistant and completely waterproof."
    ],
    tips: "Always outline the primary function (must do) and secondary function (nice to have) in your design specification."
  },
  {
    id: "sustainability",
    name: "Sustainability & Environment",
    question: "What is the environmental footprint of the product?",
    description: "Considering the life cycle of the product: sourcing renewable materials, using low-energy manufacturing, reducing packaging, and making the product easily recyclable or repairable (6 Rs of sustainability: Reduce, Reuse, Recycle, Repair, Refuse, Rethink).",
    examples: [
      "Using local Scots Pine instead of imported hardwood to reduce carbon miles.",
      "Avoiding toxic glue binders so wood components can be biodegraded."
    ],
    tips: "Show sustainability in your portfolio by sketching how the product is disassembled into pure material parts at the end of its life."
  }
];

export const dtpTerms: DtpTerm[] = [
  {
    id: "alignment",
    name: "Alignment",
    definition: "Aligning text or graphic elements along common vertical or horizontal grid lines (left, right, center, or justified).",
    purpose: "Creates a clean, ordered, professional layout and improves the document's legibility.",
    tip: "Always use vertical guidelines in CAD or desktop publishing software to keep your headers and body copy aligned."
  },
  {
    id: "bleed",
    name: "Bleed",
    definition: "An extension of graphic elements, backgrounds, or colors slightly beyond the final trim line of the page (usually 3mm).",
    purpose: "Prevents unsightly white gaps from appearing at the edge of the paper when it is trimmed to size during printing.",
    tip: "In Graphic Comm exams, remember that a 'crop mark' shows where to cut, and 'bleed' is the extra printed area past it."
  },
  {
    id: "gutter",
    name: "Gutter",
    definition: "The narrow blank column of space between two columns of text, or the inner margin of facing pages.",
    purpose: "Prevents text from running together and ensures it doesn't get swallowed in the binding of a book or magazine.",
    tip: "Gutters should be consistent across all pages to maintain design unity."
  },
  {
    id: "contrast",
    name: "Contrast",
    definition: "Placing drastically different elements next to each other (e.g. dark text on light background, large font next to small font, organic shape near geometric frame).",
    purpose: "Creates visual interest, draws the reader's eye to dominant elements (hierarchy), and improves legibility.",
    tip: "Avoid low-contrast combinations like yellow text on a white background. This is a common marking scheme trap!"
  }
];

export const lineStandards: LineStandard[] = [
  {
    id: "continuous-thick",
    name: "Continuous Thick Line",
    appearance: "Thick, solid dark line",
    use: "Visible outlines and edges of the object.",
    industryName: "BSI Standards: Outlines"
  },
  {
    id: "continuous-thin",
    name: "Continuous Thin Line",
    appearance: "Thin, solid dark line",
    use: "Dimension lines, projection lines, leader lines, hatching lines, and grid lines.",
    industryName: "BSI Standards: Dimensioning"
  },
  {
    id: "dashed-thin",
    name: "Dashed Thin Line",
    appearance: "Series of short dashes",
    use: "Hidden details and interior structures not visible from the current viewing angle.",
    industryName: "BSI Standards: Hidden Detail"
  },
  {
    id: "chain-thin",
    name: "Chain Thin Line",
    appearance: "Long dash, short dash, long dash",
    use: "Center lines of circles, lines of symmetry, and paths of motion.",
    industryName: "BSI Standards: Center Lines"
  },
  {
    id: "chain-double-dash",
    name: "Chain Thin Double-Dashed",
    appearance: "Long dash, two short dashes, long dash",
    use: "Indicating fold lines on net developments (packaging design) or alternative positions.",
    industryName: "BSI Standards: Fold Lines"
  }
];

export const safetySigns: SafetySign[] = [
  {
    id: "eye-protection",
    title: "Wear Eye Protection",
    category: "Mandatory",
    description: "Requires all pupils to wear safety goggles or glasses in the workshop, especially when using machine tools like the scroll saw or pillar drill.",
    color: "Blue circle with a white symbol",
    symbol: "Safety Goggles"
  },
  {
    id: "guard-safety",
    title: "Keep Guard in Position",
    category: "Mandatory",
    description: "All guards on the pillar drill, band saw, or scroll saw must be down before switching on the power.",
    color: "Blue circle with a white symbol",
    symbol: "Machine Guard Icon"
  },
  {
    id: "no-running",
    title: "No Running in the Workshop",
    category: "Prohibition",
    description: "Absolutely no running or playing in the craft rooms due to sharp hand tools, hot glue guns, and heavy machinery.",
    color: "Red circle with a diagonal slash over a black symbol",
    symbol: "Running Figure Crossed Out"
  },
  {
    id: "hot-surface",
    title: "Caution: Hot Surface",
    category: "Warning",
    description: "Warns pupils of hot equipment such as the soldering iron, strip heater (for bending acrylic), or vacuum former platen.",
    color: "Yellow triangle with a black border and symbol",
    symbol: "Wavy heat lines rising"
  },
  {
    id: "emergency-stop",
    title: "Emergency Stop Button",
    category: "Safe Condition",
    description: "Indicates the location of emergency power shut-off switches around the workshop that shut down all machinery instantly in an accident.",
    color: "Green square or rectangle with white lettering/symbol",
    symbol: "Large hand hitting button / Emergency Text"
  }
];

export const quizQuestions: QuizQuestion[] = [
  // Practical Woodwork
  {
    id: "wood-1",
    subject: "woodwork",
    level: "National 5",
    question: "Which of the following chisels is designed specifically with a sloped edge to fit into narrow recesses and flush-clean corners?",
    options: [
      "Mortise Chisel",
      "Bevel-Edged Chisel",
      "Firmer Chisel",
      "Cold Chisel"
    ],
    answerIndex: 1,
    explanation: "A Bevel-Edged Chisel has sloped edges which allow it to get close into tight corners and undercut joints. A Mortise Chisel is heavy, thick, and used for chopping deep rectangular holes."
  },
  {
    id: "wood-2",
    subject: "woodwork",
    level: "National 5",
    question: "When squaring up stock in Practical Woodworking, which tool is used to scribe a line parallel to an edge to indicate thickness or depth?",
    options: [
      "Marking Gauge",
      "Steel Rule",
      "Try Square",
      "Sliding Bevel"
    ],
    answerIndex: 0,
    explanation: "A Marking Gauge scribes a line parallel to a face side or face edge using a sharp pin, setting an accurate, uniform depth or thickness."
  },
  {
    id: "wood-3",
    subject: "woodwork",
    level: "National 4",
    question: "Which wood category does Scots Pine belong to, and what makes it highly popular in Scottish schools?",
    options: [
      "Hardwood; extremely dense and dark",
      "Softwood; highly sustainable, easy to cut, and cost-effective",
      "Manufactured board; completely grainless with a smooth paintable surface",
      "Thermoplastic; flexible and water-resistant"
    ],
    answerIndex: 1,
    explanation: "Scots Pine is a Softwood. It is highly sustainable, cheap, and easy for students to saw, chisel, and sand in school craft rooms."
  },

  // Design & Manufacture
  {
    id: "design-1",
    subject: "design",
    level: "National 5",
    question: "In Design and Manufacture, what is the term used to describe the study of human body sizes to size products correctly?",
    options: [
      "Ergonomics",
      "Anthropometrics",
      "Biometrics",
      "Physiology"
    ],
    answerIndex: 1,
    explanation: "Anthropometrics is specifically the study of human body measurements (like heights, widths, and reaches). Ergonomics is the wider study of how humans interact with products safely and comfortably."
  },
  {
    id: "design-2",
    subject: "design",
    level: "Higher",
    question: "When designing a product for high-volume manufacturing, which design factor directly dictates the assembly time and ease of part replacements?",
    options: [
      "Aesthetics",
      "Ergonomics",
      "Design for Manufacture & Assembly (DFMA)",
      "Market Pull"
    ],
    answerIndex: 2,
    explanation: "DFMA (Design for Manufacture & Assembly) is a design factor that aims to reduce the number of components, simplify assembly, and make production faster and cheaper."
  },
  {
    id: "design-3",
    subject: "design",
    level: "National 5",
    question: "What are the 6 Rs of Sustainability that designers use to evaluate a product's environmental impact?",
    options: [
      "Repair, Refuse, Recycle, Rethink, Reduce, Reuse",
      "Rebuild, Recover, Reheat, Recycle, Repaint, Refuse",
      "Research, Redraw, Review, Rework, Resolve, Retain",
      "Review, Rate, Refine, Re-evaluate, Re-source, Re-glue"
    ],
    answerIndex: 0,
    explanation: "The 6 Rs are: Reduce, Reuse, Recycle, Repair, Refuse, and Rethink. They guide designers to minimize material waste and energy usage."
  },

  // Graphic Communication
  {
    id: "graphics-1",
    subject: "graphics",
    level: "National 5",
    question: "Which BSI (British Standards Institution) line type is represented by a 'long dash, short dash, long dash' sequence?",
    options: [
      "Continuous Thick (Outlines)",
      "Continuous Thin (Dimensions)",
      "Dashed Thin (Hidden Detail)",
      "Chain Thin (Center Lines)"
    ],
    answerIndex: 3,
    explanation: "A Chain Thin line represents center lines, lines of symmetry, or pitch circles in technical engineering drawing."
  },
  {
    id: "graphics-2",
    subject: "graphics",
    level: "National 5",
    question: "In Desktop Publishing (DTP), what is the purpose of extending a background image 3mm past the edge of the crop marks?",
    options: [
      "To create a dominant focal point",
      "Bleed; to ensure no white gaps appear on the edge after trimming",
      "To align text columns along the margin",
      "To increase the color contrast"
    ],
    answerIndex: 1,
    explanation: "This is called Bleed. It is crucial in DTP to prevent narrow white lines at the edge of the page if the cutting blades are slightly off during trimming."
  },
  {
    id: "graphics-3",
    subject: "graphics",
    level: "Higher",
    question: "In CAD modeling, which feature allows you to sweep a 2D profile along a curved path to create a complex 3D pipe or handrail?",
    options: [
      "Extrude",
      "Revolve",
      "Sweep",
      "Loft"
    ],
    answerIndex: 2,
    explanation: "Sweep requires a 2D profile and a 2D/3D sketch path. It sweeps the profile along the path. Extrude extends in a straight line, while Revolve rotates a profile around an axis."
  },

  // BGE Classes
  {
    id: "bge-1",
    subject: "bge",
    level: "BGE",
    question: "What is the primary meaning of a BLUE circle safety sign with a white symbol in the workshop?",
    options: [
      "Danger! Immediate warning",
      "Prohibition! You are not allowed to do this",
      "Mandatory! You must do this action (e.g., wear goggles)",
      "Safe Condition! Shows first aid or exits"
    ],
    answerIndex: 2,
    explanation: "Blue circle signs are 'Mandatory'. They tell you what you must do to keep safe, such as wearing ear protectors or eye safety goggles."
  },
  {
    id: "bge-2",
    subject: "bge",
    level: "BGE",
    question: "Which hand saw is the best choice for cutting a straight, highly accurate line in S1 pine or MDF strip boards?",
    options: [
      "Tenon Saw",
      "Coping Saw",
      "Hacksaw",
      "Keyhole Saw"
    ],
    answerIndex: 0,
    explanation: "A Tenon Saw is reinforced with a brass or steel spine on the back to keep the blade completely stiff and straight. It is perfect for fine joint and accurate straight cuts in wood. Coping saws are for cutting curves."
  }
];
