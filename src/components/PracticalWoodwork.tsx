import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Hammer, 
  Wrench, 
  Compass, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  ScrollText, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  ClipboardList, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ShieldAlert,
  Sliders,
  Maximize2,
  Sparkles
} from "lucide-react";

// Types for Woodwork Joints
interface JointStep {
  title: string;
  description: string;
  toolUsed: string;
  tips: string;
}

interface WoodworkJoint {
  id: string;
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  pros: string[];
  cons: string[];
  commonUses: string;
  steps: JointStep[];
}

const woodworkJointsData: WoodworkJoint[] = [
  {
    id: "corner-lap",
    name: "Corner Lap Joint",
    difficulty: "Beginner",
    description: "An easy framing joint where the ends of two overlapping boards are rebated to half their thickness to sit completely flush.",
    pros: ["Very simple to mark out and cut", "Sits completely flush on both faces", "Great for simple picture frames and basic trays"],
    cons: ["Relies entirely on glue/fasteners for strength", "Shows end grain on both edges"],
    commonUses: "Basic framing, drawer/box frames, junior school projects.",
    steps: [
      {
        title: "Marking Out the Shoulders",
        description: "Set your wood pieces together at right angles. Scribe a pencil line along the overlap using a Try Square, then use a Marking Gauge set to exactly half the wood's thickness to mark the depth line along the edge.",
        toolUsed: "Try Square & Marking Gauge",
        tips: "Ensure your gauge pin is sharp. Always scribe from the face side or face edge (marked with face marks)."
      },
      {
        title: "Scribing Saw Cuts",
        description: "Mark the waste wood clearly with an 'X'. Clamp the timber in the woodwork vice. Position your Tenon Saw on the waste side of the shoulder line and make a vertical cut down to the half-thickness gauge line.",
        toolUsed: "Tenon Saw",
        tips: "Keep your index finger pointing along the saw spine to stabilize the cut. Saw beside the line, not on it!"
      },
      {
        title: "Chiseling Out the Waste",
        description: "Place the wood flat on a chopping board. Secure with a G-clamp. Use a Bevel-Edged Chisel and a wooden mallet to chisel away the waste block, working in thin horizontal layers.",
        toolUsed: "Bevel-Edged Chisel & Mallet",
        tips: "Keep the flat back of the chisel face-down for pare-cutting to guarantee a perfectly flat bottom surface."
      },
      {
        title: "Assembling & Fitting",
        description: "Check the fit of the overlapping joint. Both pieces should interlock perfectly flush at a exact 90-degree angle. Lightly sand high spots, apply PVA wood glue, and clamp securely.",
        toolUsed: "Sash Clamps & Try Square",
        tips: "Always check corner-to-corner diagonal measurements to ensure the frame assembly is completely square."
      }
    ]
  },
  {
    id: "housing",
    name: "Housing Joint",
    difficulty: "Beginner",
    description: "A secure slot or trench cut across the face of one piece of wood, into which the end of a shelf or divider slides.",
    pros: ["Provides excellent support for shelving", "Prevents boards from twisting or warping", "Hides end grain on one board"],
    cons: ["Weak against tension (pulling apart) unless glued/screwed", "Requires parallel saw cuts of identical depth"],
    commonUses: "Bookshelves, cabinet interiors, division panels.",
    steps: [
      {
        title: "Marking the Trench",
        description: "Measure and mark the thickness of your shelf across the base board. Scribe two parallel lines using a Try Square. Scribe the depth line (usually 1/3 of the wood thickness) on both outer edges.",
        toolUsed: "Try Square & Steel Rule",
        tips: "Use the actual shelf board to mark the slot width to ensure a snug, gap-free fit."
      },
      {
        title: "Sawing Trench Shoulders",
        description: "To make vertical cuts, clamp a straight wood block (batten) exactly along your pencil line. Guide your Tenon Saw against the batten and saw down to the 1/3 depth mark.",
        toolUsed: "Tenon Saw & Clamped Batten",
        tips: "The batten guarantees your saw cut remains perfectly straight and perpendicular to the face."
      },
      {
        title: "Chiseling the Trench",
        description: "Work with a Bevel-Edged Chisel from both outer sides toward the center. Chop out the wood fibers in the trench, holding the chisel bevel-down to scoop waste, then flat back down to finish.",
        toolUsed: "Bevel-Edged Chisel & Mallet",
        tips: "Never chisel all the way across in one go, or you will split the wood fibers on the far exit edge."
      },
      {
        title: "Final Joint Glue-up",
        description: "Slide the shelf into the chiseled trench. It should require a light tap with a mallet, but not split the base. Apply glue to the channel walls and clamp tightly.",
        toolUsed: "PVA Glue & G-Clamps",
        tips: "If the joint is too tight, use a router plane to clean the housing floor, or lightly plane the end of the shelf."
      }
    ]
  },
  {
    id: "stopped-housing",
    name: "Stopped Housing Joint",
    difficulty: "Intermediate",
    description: "Similar to a standard housing joint, but the trench stops short of the front edge, making the joint completely invisible from the front.",
    pros: ["Incredibly clean aesthetic", "Hides the joint trench completely from the front view"],
    cons: ["More complex because you cannot saw the full width of the board", "Requires a notch cut on the shelf corner"],
    commonUses: "High-quality bookcases, fine cabinets, display shelving units.",
    steps: [
      {
        title: "Marking the Stop Point",
        description: "Mark the trench width using a Try Square, but stop 12mm before the front face. Scribe a 1/3 depth line on the back edge, and transfer the stop boundary on the board face.",
        toolUsed: "Try Square & Marking Knife",
        tips: "A marking knife line helps guide the chisel blade in the next steps."
      },
      {
        title: "Chiseling the Relief Pocket",
        description: "Because you cannot saw all the way across, you must chop a small relief pocket at the stopped end of the trench. Use a chisel to chop a neat socket to the required depth.",
        toolUsed: "Bevel-Edged Chisel & Mallet",
        tips: "This pocket provides an empty space for the tenon saw to stop its cut safely."
      },
      {
        title: "Sawing & Trenching",
        description: "Saw carefully down the shoulder lines starting from the back edge, stopping exactly at your relief pocket. Chisel out the waste in the channel, routing it completely flat.",
        toolUsed: "Tenon Saw & Router Plane",
        tips: "A Router Plane is excellent here to ensure the bottom of the slot has a uniform depth along its entire length."
      },
      {
        title: "Notching the Shelf & Fit",
        description: "Cut a 12mm notch on the front corner of the shelf piece (the tenon). Test the shelf fit into the stopped slot. It should sit flush with the front edge of the main frame.",
        toolUsed: "Tenon Saw & Wood Mallet",
        tips: "Ensure the notch length matches the intact margin of the housing board perfectly."
      }
    ]
  },
  {
    id: "mitre",
    name: "Mitre Joint",
    difficulty: "Beginner",
    description: "A joint made by beveling each of the two mating boards at a 45-degree angle to form a neat, clean 90-degree corner.",
    pros: ["Extremely neat; no raw end grain is visible", "Maintains grain continuity around corners"],
    cons: ["Very weak mechanical strength on its own", "Requires absolute precision in the 45-degree cut"],
    commonUses: "Picture frames, boxes, decorative trim mold moldings.",
    steps: [
      {
        title: "Marking the 45 Degree Angle",
        description: "Scribe a 45-degree angle across the face and edges of both boards using a mitre square or a sliding bevel set with a protractor.",
        toolUsed: "Sliding Bevel or Mitre Square",
        tips: "Ensure your lines continue exactly around all three sides of the timber."
      },
      {
        title: "Cutting the Mitre Bevel",
        description: "Place the wood in a Mitre Box to guide the saw blade, or clamp it in a vice and cut slowly down the line using a Tenon Saw.",
        toolUsed: "Tenon Saw & Mitre Box",
        tips: "Keep your saw strokes light and flat. Ensure you do not force the saw, which can warp the plastic/wood guide."
      },
      {
        title: "Shooting the Edges",
        description: "Clamp the cut piece on a Shooting Board. Use a Block Plane held sideways to shave paper-thin shavings off the 45-degree end face.",
        toolUsed: "Block Plane & Shooting Board",
        tips: "Shooting boards are vital in school workshops to achieve an exact 45-degree angle for airtight corners."
      },
      {
        title: "Gluing & Clamping Corners",
        description: "Apply glue to the end grains. Join the corners. Secure them using a web clamp, band clamp, or specialized mitre corner clamps.",
        toolUsed: "Web Clamp & PVA Glue",
        tips: "Add a spline (a thin wood strip in a saw slot) to reinforce the joint if it needs to load-bear."
      }
    ]
  },
  {
    id: "mortise-tenon",
    name: "Mortise & Tenon Joint",
    difficulty: "Advanced",
    description: "One of the strongest woodwork joints, consisting of a projecting pin (tenon) on one piece inserted into a deep rectangular matching hole (mortise).",
    pros: ["Incredibly strong and rigid", "Resists shear and rotational forces", "Large surface area for glue bonding"],
    cons: ["Requires high accuracy to ensure cheeks and shoulders fit tightly", "Difficult to chop deep, square holes"],
    commonUses: "Tables, heavy doors, chairs, structural timber frames.",
    steps: [
      {
        title: "Marking Mortise & Tenon",
        description: "Set a Mortise Gauge to match your mortise chisel width. Scribe parallel lines on both pieces. Mark the tenon length and shoulders using a Try Square and pencil.",
        toolUsed: "Mortise Gauge & Try Square",
        tips: "A mortise gauge has two adjustable pins to scribe both parallel lines in a single stroke!"
      },
      {
        title: "Chapping the Mortise Slot",
        description: "Select a thick Mortise Chisel. Chop starting from the center of the lines, holding it vertically. Hit with a mallet, levering out wood chips down to depth.",
        toolUsed: "Mortise Chisel & Wood Mallet",
        tips: "Keep your chisel bevel-down when clearing waste. Keep the flat side facing the ends of the mortise slot."
      },
      {
        title: "Cutting Tenon Cheeks",
        description: "Clamp the tenon piece in the vice at an angle. Saw down the waste side of the tenon cheeks with a Tenon Saw, then cut the shoulders horizontally to release waste.",
        toolUsed: "Tenon Saw & Wood Vice",
        tips: "Always saw down on the waste side of your line. If you saw on the line, the tenon will be too loose."
      },
      {
        title: "Fitting & Finishing",
        description: "Clean up the tenon cheeks using a shoulder plane if needed. Tap the tenon into the mortise hole. The shoulders must sit flush on the rail face with no visible gaps.",
        toolUsed: "Shoulder Plane & Mallet",
        tips: "Never force the tenon in with a heavy hammer, or you will split the mortised board."
      }
    ]
  },
  {
    id: "dowel",
    name: "Dowel Joint",
    difficulty: "Intermediate",
    description: "A fast, clean joint that uses cylindrical wooden pegs (dowels) inserted into matching pre-drilled holes to join boards.",
    pros: ["Quick to align and construct", "Completely hidden joint", "Excellent for manufactured boards like MDF or plywood"],
    cons: ["If holes are misaligned by even 0.5mm, the joint will be crooked"],
    commonUses: "Flat-pack furniture, cabinet carcasses, edge-joining boards.",
    steps: [
      {
        title: "Marking Drill Centerpoints",
        description: "Clamp the two pieces edge-to-edge. Draw a line across the joint with a Try Square to mark the center coordinate of each dowel.",
        toolUsed: "Try Square & Marking Gauge",
        tips: "Marking with a sharp pencil or marking knife is crucial for centering the drill bit."
      },
      {
        title: "Drilling Aligning Holes",
        description: "Clamp a Dowel Jig to your board to guide the drill bit perfectly vertical. Use a twist drill bit with a depth stop collar set to half the dowel length plus 2mm.",
        toolUsed: "Pillar Drill (or Hand Drill & Jig)",
        tips: "The extra 2mm of depth acts as a crucial pocket for excess glue to settle into."
      },
      {
        title: "Glue & Dowel Insertion",
        description: "Squeeze wood glue into the holes. Insert fluted wooden dowels. Tap them gently with a hammer into one side.",
        toolUsed: "Wood Glue & Steel Hammer",
        tips: "Use fluted dowels! The grooves let trapped air and glue escape when the joint is compressed."
      },
      {
        title: "Mating & Clamping",
        description: "Add glue to the remaining holes. Align the second board over the protruding dowels. Press them together, and clamp firmly with bar clamps.",
        toolUsed: "Sash Clamps",
        tips: "Wipe off any squeezed-out PVA glue immediately with a damp cloth to prevent finish blotching."
      }
    ]
  },
  {
    id: "dovetail",
    name: "Dovetail Joint",
    difficulty: "Advanced",
    description: "An iconic, beautifully decorative joint famous for its incredible interlocking tensile strength. Interlocking wedges called pins and tails resist pulling apart.",
    pros: ["Incredibly strong mechanical connection", "Highly beautiful; a mark of a skilled craftsman"],
    cons: ["Very difficult to mark out and cut accurately by hand", "Requires expert chisel control"],
    commonUses: "Drawer fronts, premium boxes, jewelry chest frames.",
    steps: [
      {
        title: "Scribing the Tail Outlines",
        description: "Mark the wood thickness depth around the end of both boards. Use a Sliding Bevel set to a ratio of 1:6 (softwoods) to draw the wedge-shaped tail lines on the end grain.",
        toolUsed: "Sliding Bevel & Try Square",
        tips: "1:6 is for softwood (steeper angle), 1:8 is for hardwoods (shallower angle)."
      },
      {
        title: "Cutting Tail Shoulders",
        description: "Use a fine Dovetail Saw to cut down the marked lines. Saw out the remaining waste wood between the tails using a Coping Saw, then chisel flat back to the shoulder line.",
        toolUsed: "Dovetail Saw & Coping Saw",
        tips: "A coping saw lets you remove the bulk of the waste quickly, saving wear on your chisel edges."
      },
      {
        title: "Transferring to the Pin Board",
        description: "Clamp the pin board vertically in the vice. Position your finished tail board flat on top. Scribe the pin shapes onto the end grain of the pin board using a sharp Marking Knife.",
        toolUsed: "Marking Knife & Pencil",
        tips: "A marking knife is perfect here because it slices the fibers, giving a physical recess for your saw to start in."
      },
      {
        title: "Chiseling Pins & Mating",
        description: "Saw down the pin lines. Chisel the waste blocks away working from both faces. Gently tap the interlocking fingers together using a mallet and scrap block.",
        toolUsed: "Bevel-Edged Chisel & Mallet",
        tips: "Always place a scrap piece of wood on top of the joint when tapping to avoid damaging the clean dovetail grain."
      }
    ]
  }
];

// Helper to project 3D coordinate to 2D
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face3D {
  points: Point3D[];
  color: string;
  outlineColor: string;
  isMarkingLine?: boolean;
  isSawLine?: boolean;
}

const rotateX = (p: Point3D, angle: number): Point3D => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: p.x,
    y: p.y * cos - p.z * sin,
    z: p.y * sin + p.z * cos
  };
};

const rotateY = (p: Point3D, angle: number): Point3D => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: p.x * cos + p.z * sin,
    y: p.y,
    z: -p.x * sin + p.z * cos
  };
};

const project = (p: Point3D, yaw: number, pitch: number, scale: number, width: number, height: number, offsetX: number = 0, offsetY: number = 0) => {
  const p1 = rotateY(p, yaw);
  const p2 = rotateX(p1, pitch);
  return {
    x: width / 2 + p2.x * scale + offsetX,
    y: height / 2 - p2.y * scale + offsetY,
    z: p2.z
  };
};

export default function PracticalWoodwork() {
  const [activeTab, setActiveTab] = useState<"joints" | "drawings" | "projects" | "logbook">("joints");

  // Joints State
  const [selectedJoint, setSelectedJoint] = useState<WoodworkJoint>(woodworkJointsData[0]);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [explodeFactor, setExplodeFactor] = useState<number>(30); // 0 to 100
  const [yaw, setYaw] = useState<number>(35);
  const [pitch, setPitch] = useState<number>(20);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  // Dragging interaction state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragMode, setDragMode] = useState<"explode" | "rotate">("explode");
  const [initialYaw, setInitialYaw] = useState<number>(35);
  const [initialPitch, setInitialPitch] = useState<number>(20);
  const [initialExplode, setInitialExplode] = useState<number>(30);

  // Reset view to defaults
  const resetView = () => {
    setYaw(35);
    setPitch(20);
    setOffsetX(0);
    setOffsetY(0);
    setExplodeFactor(0); // return blocks to their default fitted position
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });

    if (e.shiftKey) {
      setDragMode("rotate");
      setInitialYaw(yaw);
      setInitialPitch(pitch);
    } else {
      setDragMode("explode");
      setInitialExplode(explodeFactor);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    if (dragMode === "rotate") {
      // Rotation sensitivity
      const newYaw = initialYaw + dx * 0.7;
      const newPitch = Math.max(-45, Math.min(45, initialPitch - dy * 0.7));
      setYaw(Math.round(newYaw));
      setPitch(Math.round(newPitch));
    } else {
      // Drag blocks to separate them (moving right or up expands, left or down contracts)
      const factor = (dx - dy) * 0.6;
      const newExplode = Math.max(0, Math.min(100, initialExplode + factor));
      setExplodeFactor(Math.round(newExplode));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // AI Joint Advisor state
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  const fetchAiAdvice = async () => {
    setIsGenerating(true);
    setAiError("");
    try {
      const response = await fetch("/api/gemini/woodwork-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jointName: selectedJoint.name,
          jointId: selectedJoint.id,
          userQuestion: aiQuestion
        })
      });
      const data = await response.json();
      if (response.ok) {
        setAiAdvice(data.advice);
      } else {
        setAiError(data.error || "Failed to generate advice");
      }
    } catch (err) {
      setAiError("Connection error while calling Gemini Pro");
    } finally {
      setIsGenerating(false);
    }
  };

  // Drawing State (Orthographic quiz)
  const [selectedQAnswers, setSelectedQAnswers] = useState<Record<number, number>>({});
  const [showQFeedback, setShowQFeedback] = useState<Record<number, boolean>>({});

  // 3D Rendering details
  const width = 450;
  const height = 300;
  const scale = 1.6;

  // Custom 3D joint model builder based on joint type, step index, and explode factor
  const getJointFaces = (jointId: string, step: number, explode: number): Face3D[] => {
    const faces: Face3D[] = [];
    const exp = explode / 100.0; // scale to 0..1

    // Colors
    const woodA = "#E3A869"; // Light wood (Pine)
    const woodB = "#B07A4A"; // Perpendicular wood (Teak/Dark Pine)
    const lineBlue = "#2563EB"; // Scribing lines
    const lineOrange = "#F97316"; // Cutting/Saw lines
    const border = "rgba(0,0,0,0.2)";

    // Box builder helper
    const addBox = (
      x1: number, y1: number, z1: number,
      x2: number, y2: number, z2: number,
      color: string,
      isPieceB: boolean = false
    ) => {
      // Apply explode shift to Piece B
      let dx = 0, dy = 0, dz = 0;
      if (isPieceB) {
        if (jointId === "corner-lap") { dy = exp * 45; }
        else if (jointId === "housing" || jointId === "stopped-housing") { dy = exp * 50; }
        else if (jointId === "mitre") { dx = exp * 35; dz = exp * -35; }
        else if (jointId === "mortise-tenon") { dy = exp * 55; }
        else if (jointId === "dowel") { dx = exp * 55; }
        else if (jointId === "dovetail") { dx = exp * 45; }
      }

      const v = [
        { x: x1 + dx, y: y1 + dy, z: z1 + dz }, // 0
        { x: x2 + dx, y: y1 + dy, z: z1 + dz }, // 1
        { x: x2 + dx, y: y2 + dy, z: z1 + dz }, // 2
        { x: x1 + dx, y: y2 + dy, z: z1 + dz }, // 3
        { x: x1 + dx, y: y1 + dy, z: z2 + dz }, // 4
        { x: x2 + dx, y: y1 + dy, z: z2 + dz }, // 5
        { x: x2 + dx, y: y2 + dy, z: z2 + dz }, // 6
        { x: x1 + dx, y: y2 + dy, z: z2 + dz }, // 7
      ];

      faces.push(
        { points: [v[0], v[1], v[2], v[3]], color, outlineColor: border }, // Back
        { points: [v[1], v[5], v[6], v[2]], color, outlineColor: border }, // Right
        { points: [v[4], v[0], v[3], v[7]], color, outlineColor: border }, // Left
        { points: [v[5], v[4], v[7], v[6]], color, outlineColor: border }, // Front
        { points: [v[3], v[2], v[6], v[7]], color, outlineColor: border }, // Top
        { points: [v[4], v[5], v[1], v[0]], color, outlineColor: border }  // Bottom
      );
    };

    if (jointId === "corner-lap") {
      // PIECE A: horizontal base board extending left
      if (step < 2) {
        // Intact board
        addBox(-75, -10, -15, 15, 10, 15, woodA, false);
      } else {
        // Step 2 and 3 show the rebate lap cut out
        // Cutout is x from -15 to 15, y from 0 to 10
        addBox(-75, -10, -15, -15, 10, 15, woodA, false); // Main section
        addBox(-15, -10, -15, 15, 0, 15, woodA, false); // Cut lap section (retained bottom half)
      }

      // PIECE B: perpendicular board extending forward
      if (step < 2) {
        // Intact board
        addBox(-15, -10, -15, 15, 10, 75, woodB, true);
      } else {
        // Cutout is x from -15 to 15, y from -10 to 0, z from -15 to 15
        addBox(-15, -10, 15, 15, 10, 75, woodB, true); // Main section
        addBox(-15, 0, -15, 15, 10, 15, woodB, true); // Cut lap section (retained top half)
      }

      // Overlay marking lines on raw timber (Step 0)
      if (step === 0) {
        // blue line on Piece A indicating where to cut (shoulder line)
        faces.push({
          points: [{ x: -15, y: 10.1, z: -15 }, { x: -15, y: 10.1, z: 15 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
        // blue line on Piece B
        faces.push({
          points: [{ x: -15, y: 10.1 + (exp * 45), z: 15 }, { x: 15, y: 10.1 + (exp * 45), z: 15 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
      }
      // Overlay saw cuts lines (Step 1)
      if (step === 1) {
        faces.push({
          points: [{ x: -15.1, y: 10, z: -15 }, { x: -15.1, y: -10, z: -15 }],
          color: lineOrange, outlineColor: lineOrange, isSawLine: true
        });
        faces.push({
          points: [{ x: -15, y: 10 + (exp * 45), z: 15.1 }, { x: 15, y: 10 + (exp * 45), z: 15.1 }],
          color: lineOrange, outlineColor: lineOrange, isSawLine: true
        });
      }
    } 
    
    else if (jointId === "housing") {
      // PIECE A: horizontal wide base board
      if (step < 2) {
        addBox(-65, -15, -20, 65, 0, 20, woodA, false);
      } else {
        // Trench slot in the center from x=-10 to 10, y=-5 to 0.
        addBox(-65, -15, -20, -10, 0, 20, woodA, false); // Left
        addBox(-10, -15, -20, 10, -5, 20, woodA, false); // Bottom floor of groove
        addBox(10, -15, -20, 65, 0, 20, woodA, false); // Right
      }

      // PIECE B: vertical shelf
      if (step < 2) {
        addBox(-10, 0, -20, 10, 55, 20, woodB, true);
      } else {
        // Extends 5mm deeper into the chiseled groove for perfect interlocking fit
        addBox(-10, 0, -20, 10, 55, 20, woodB, true); // Upper shelf body
        addBox(-10, -5, -20, 10, 0, 20, woodB, true); // Insertion tongue (fully slots into trench)
      }

      if (step === 0) {
        // blue shoulder lines for the housing trench
        faces.push({
          points: [{ x: -10, y: 0.1, z: -20 }, { x: -10, y: 0.1, z: 20 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
        faces.push({
          points: [{ x: 10, y: 0.1, z: -20 }, { x: 10, y: 0.1, z: 20 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
      }
      if (step === 1) {
        faces.push({
          points: [{ x: -10, y: 0, z: 20.1 }, { x: -10, y: -5, z: 20.1 }],
          color: lineOrange, outlineColor: lineOrange, isSawLine: true
        });
        faces.push({
          points: [{ x: 10, y: 0, z: 20.1 }, { x: 10, y: -5, z: 20.1 }],
          color: lineOrange, outlineColor: lineOrange, isSawLine: true
        });
      }
    }

    else if (jointId === "stopped-housing") {
      // Trench slot stops 10mm before front edge (z = 10, front is at z = 20)
      // PIECE A:
      if (step < 2) {
        addBox(-65, -15, -20, 65, 0, 20, woodA, false);
      } else {
        // Cutout is x from -10 to 10, y from -5 to 0, z from -20 to 10.
        addBox(-65, -15, -20, -10, 0, 20, woodA, false); // Left
        addBox(10, -15, -20, 65, 0, 20, woodA, false); // Right
        addBox(-10, -15, -20, 10, -5, 10, woodA, false); // Slot bottom groove
        addBox(-10, -15, 10, 10, 0, 20, woodA, false); // Uncut front lip (stops trench)
      }

      // PIECE B: shelf. Fits stopped housing, meaning there is a notched lip.
      // Shelf notches the front corner (z = 10 to 20 gets cut out by 5mm height)
      if (step < 3) {
        // intact board
        addBox(-10, 0, -20, 10, 55, 20, woodB, true);
      } else {
        // notched board in Step 3/Assembly
        addBox(-10, 0, -20, 10, 55, 20, woodB, true); // upper shelf body (sitting on base)
        addBox(-10, -5, -20, 10, 0, 10, woodB, true); // bottom rear tongue (goes down into stopped groove)
      }

      if (step === 0) {
        faces.push({
          points: [{ x: -10, y: 0.1, z: -20 }, { x: -10, y: 0.1, z: 10 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
        faces.push({
          points: [{ x: 10, y: 0.1, z: -20 }, { x: 10, y: 0.1, z: 10 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
        // Stop line across face
        faces.push({
          points: [{ x: -10, y: 0.1, z: 10 }, { x: 10, y: 0.1, z: 10 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
      }
    }

    else if (jointId === "mitre") {
      // 45 degree corner joint. Requires custom polygon faces
      // Piece A: horizontal from -60 to 0, end at x=0 cut at 45 degrees
      let shiftX = 0, shiftZ = 0;
      shiftX = exp * 35;
      shiftZ = exp * -35;

      const vA_intact = [
        { x: -65, y: -10, z: -15 }, { x: 15, y: -10, z: -15 },
        { x: 15, y: 10, z: -15 }, { x: -65, y: 10, z: -15 },
        { x: -65, y: -10, z: 15 }, { x: 15, y: -10, z: 15 },
        { x: 15, y: 10, z: 15 }, { x: -65, y: 10, z: 15 }
      ];

      const vA_cut = [
        { x: -65, y: -10, z: -15 }, { x: 15, y: -10, z: -15 },
        { x: 15, y: 10, z: -15 }, { x: -65, y: 10, z: -15 },
        { x: -65, y: -10, z: 15 }, { x: -15, y: -10, z: 15 }, // miter angled coordinate
        { x: -15, y: 10, z: 15 }, { x: -65, y: 10, z: 15 }
      ];

      const refvA = step < 2 ? vA_intact : vA_cut;

      faces.push(
        { points: [refvA[0], refvA[1], refvA[2], refvA[3]], color: woodA, outlineColor: border },
        { points: [refvA[1], refvA[5], refvA[6], refvA[2]], color: woodA, outlineColor: border },
        { points: [refvA[4], refvA[0], refvA[3], refvA[7]], color: woodA, outlineColor: border },
        { points: [refvA[5], refvA[4], refvA[7], refvA[6]], color: woodA, outlineColor: border },
        { points: [refvA[3], refvA[2], refvA[6], refvA[7]], color: woodA, outlineColor: border },
        { points: [refvA[4], refvA[5], refvA[1], refvA[0]], color: woodA, outlineColor: border }
      );

      // Piece B perpendicular (extends forward)
      const vB_intact = [
        { x: -15 + shiftX, y: -10, z: -15 + shiftZ }, { x: 15 + shiftX, y: -10, z: -15 + shiftZ },
        { x: 15 + shiftX, y: 10, z: -15 + shiftZ }, { x: -15 + shiftX, y: 10, z: -15 + shiftZ },
        { x: -15 + shiftX, y: -10, z: 65 + shiftZ }, { x: 15 + shiftX, y: -10, z: 65 + shiftZ },
        { x: 15 + shiftX, y: 10, z: 65 + shiftZ }, { x: -15 + shiftX, y: 10, z: 65 + shiftZ }
      ];

      // Cleaned up miter cut vertices for Piece B to prevent rendering degeneracies
      const vB_cut = [
        { x: -15 + shiftX, y: -10, z: 15 + shiftZ }, // bottom front-left
        { x: 15 + shiftX, y: -10, z: -15 + shiftZ }, // bottom front-right (angled)
        { x: 15 + shiftX, y: 10, z: -15 + shiftZ },  // top front-right (angled)
        { x: -15 + shiftX, y: 10, z: 15 + shiftZ },  // top front-left
        { x: -15 + shiftX, y: -10, z: 65 + shiftZ }, // bottom back-left
        { x: 15 + shiftX, y: -10, z: 65 + shiftZ },  // bottom back-right
        { x: 15 + shiftX, y: 10, z: 65 + shiftZ },   // top back-right
        { x: -15 + shiftX, y: 10, z: 65 + shiftZ }   // top back-left
      ];

      const refvB = step < 2 ? vB_intact : vB_cut;

      faces.push(
        { points: [refvB[0], refvB[1], refvB[2], refvB[3]], color: woodB, outlineColor: border },
        { points: [refvB[1], refvB[5], refvB[6], refvB[2]], color: woodB, outlineColor: border },
        { points: [refvB[4], refvB[0], refvB[3], refvB[7]], color: woodB, outlineColor: border },
        { points: [refvB[5], refvB[4], refvB[7], refvB[6]], color: woodB, outlineColor: border },
        { points: [refvB[3], refvB[2], refvB[6], refvB[7]], color: woodB, outlineColor: border },
        { points: [refvB[4], refvB[5], refvB[1], refvB[0]], color: woodB, outlineColor: border }
      );

      if (step === 0) {
        faces.push({
          points: [{ x: 15, y: 10.1, z: -15 }, { x: -15, y: 10.1, z: 15 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
      }
    }

    else if (jointId === "mortise-tenon") {
      // Piece A: Horizontal base board with mortise hole in the center.
      if (step < 2) {
        addBox(-65, -15, -15, 65, 10, 15, woodA, false);
      } else {
        // Mortise hole cut out (x from -8 to 8, z from -6 to 6, y goes down full thickness)
        addBox(-65, -15, -15, -8, 10, 15, woodA, false); // Left
        addBox(8, -15, -15, 65, 10, 15, woodA, false); // Right
        addBox(-8, -15, -15, 8, 10, -6, woodA, false); // Back collar
        addBox(-8, -15, 6, 8, 10, 15, woodA, false); // Front collar
      }

      // Piece B: Vertical board with Tenon projection at lower end
      if (step < 3) {
        // Raw vertical block extending upward
        addBox(-16, 10, -15, 16, 75, 15, woodB, true);
      } else {
        // Tenoned vertical block (Tenon width is 16, depth is 12, shoulder is cut back to form Tenon)
        addBox(-16, 10, -15, 16, 75, 15, woodB, true); // Main upper body (sits on base)
        addBox(-8, -5, -6, 8, 10, 6, woodB, true); // Tenon tongue (slides down inside the mortise slot)
      }

      if (step === 0) {
        // Mortise lines on Piece A
        faces.push({
          points: [{ x: -8, y: 10.1, z: -6 }, { x: 8, y: 10.1, z: -6 }, { x: 8, y: 10.1, z: 6 }, { x: -8, y: 10.1, z: 6 }],
          color: lineBlue, outlineColor: lineBlue, isMarkingLine: true
        });
      }
    }

    else if (jointId === "dowel") {
      // Piece A and Piece B joining end-to-end
      addBox(-65, -15, -15, 0, 15, 15, woodA, false);
      addBox(0, -15, -15, 65, 15, 15, woodB, true);

      // Dowels (Step 2 and 3 render wooden cylindrical blocks)
      if (step >= 2) {
        const dOffset = exp * 55;
        // Two horizontal pegs
        addBox(-12 + (dOffset*0.5), -5, -4, 12 + (dOffset*0.5), -1, 4, "#E2C48E", false);
        addBox(-12 + (dOffset*0.5), 5, -4, 12 + (dOffset*0.5), 9, 4, "#E2C48E", false);
      }

      if (step === 1) {
        // Circle drill holes indicators on face
        faces.push({
          points: [{ x: -0.1, y: -3, z: -3 }, { x: -0.1, y: -3, z: 3 }, { x: -0.1, y: 1, z: 3 }, { x: -0.1, y: 1, z: -3 }],
          color: "#000", outlineColor: "#000"
        });
        faces.push({
          points: [{ x: -0.1, y: 5, z: -3 }, { x: -0.1, y: 5, z: 3 }, { x: -0.1, y: 9, z: 3 }, { x: -0.1, y: 9, z: -3 }],
          color: "#000", outlineColor: "#000"
        });
      }
    }

    else if (jointId === "dovetail") {
      // Accurate representation of a single drawer dovetail joint
      // Piece A (horizontal, has tails cut at end, raw board extends to x=15 to include the tail)
      if (step < 2) {
        addBox(-65, -12, -15, 15, 12, 15, woodA, false);
      } else {
        // Scribe wedge on end of Piece A
        // Main body section ends at x=0
        addBox(-65, -12, -15, 0, 12, 15, woodA, false);
        // Flared wedge tail projects into Piece B (extends from x=0 to 15, width z from -7 to 7)
        addBox(0, -12, -7, 15, 12, 7, woodA, false); 
      }

      // Piece B (vertical/perpendicular pin board with matching notch socket)
      // shifts horizontally with explode
      const dShift = exp * 45;
      if (step < 3) {
        addBox(0 + dShift, -12, -15, 15 + dShift, 12, 55, woodB, true);
      } else {
        // Pin board has a hollow slot in the center to receive tail (from z = -7 to 7, x = 0 to 15)
        addBox(0 + dShift, -12, 15, 15 + dShift, 12, 55, woodB, true); // Rear body
        addBox(0 + dShift, -12, -15, 15 + dShift, 12, -7, woodB, true); // Left pin leg
        addBox(0 + dShift, -12, 7, 15 + dShift, 12, 15, woodB, true);  // Right pin leg
      }
    }

    return faces;
  };

  // Orthographic drawing tutorial questions
  const orthographicQuestions = [
    {
      id: 1,
      question: "Which view is directly positioned directly BELOW the Plan View in a standard British 3rd Angle Projection drawing?",
      options: [
        "End Elevation",
        "Front Elevation",
        "Isometric View",
        "Sectional View"
      ],
      correctIndex: 1,
      explanation: "Correct! In Third Angle projection, the Front Elevation is positioned directly underneath the Plan View, aligning perfectly with projection lines."
    },
    {
      id: 2,
      question: "If a shelf dimensions are marked as 'Length: 450' in an SQA working drawing, what is its exact size in millimeters and centimeters?",
      options: [
        "450 cm (4.5 meters)",
        "4.5 mm (0.45 cm)",
        "450 mm (45 cm)",
        "45 mm (4.5 cm)"
      ],
      correctIndex: 2,
      explanation: "Correct! In technical graphics, all sizes are ALWAYS in millimeters. 450 millimeters equals exactly 45 centimeters."
    },
    {
      id: 3,
      question: "Which BSI standard line type is used to represent Hidden Details, such as a housing trench cut on the underside of a table top?",
      options: [
        "Continuous Thick Line",
        "Continuous Thin Line",
        "Chain Thin Line",
        "Dashed Thin Line"
      ],
      correctIndex: 3,
      explanation: "Correct! A Dashed Thin line represents hidden outlines and details not directly visible from the current projection angle."
    }
  ];

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    setSelectedQAnswers({ ...selectedQAnswers, [qIdx]: optIdx });
    setShowQFeedback({ ...showQFeedback, [qIdx]: true });
  };

  return (
    <div className="space-y-8" id="woodwork-subject-panel">
      {/* Subject Header */}
      <div className="bg-slate-900 border-l-8 border-amber-600 rounded-3xl p-6 text-white flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
            National 4 & 5 Curricular Desk
          </span>
          <h2 className="text-3xl font-black tracking-tight mt-2 flex items-center gap-2 text-white">
            <Hammer className="w-7 h-7 text-amber-500" />
            Practical Woodwork Portal
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Acquire precision woodworking skills. Explore interactive 3D joinery, analyze SQA third-angle projection models, inspect logbook guidelines, and prepare for your written theory assignments.
          </p>
        </div>

        {/* Major Segment Toggles */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab("joints")}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === "joints" ? "bg-amber-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            1. Joints
          </button>
          <button
            onClick={() => setActiveTab("drawings")}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === "drawings" ? "bg-amber-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            2. Working Drawings
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === "projects" ? "bg-amber-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            3. Projects
          </button>
          <button
            onClick={() => setActiveTab("logbook")}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === "logbook" ? "bg-amber-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            4. Logbook & Theory
          </button>
        </div>
      </div>

      {/* RENDER TAB 1: INTERACTIVE WOODWORKING JOINTS */}
      {activeTab === "joints" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Joint Selection Panel */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest pl-1">
              Select SQA Core Joint
            </h3>
            <div className="space-y-1.5">
              {woodworkJointsData.map((joint) => (
                <button
                  key={joint.id}
                  onClick={() => {
                    setSelectedJoint(joint);
                    setActiveStepIdx(0);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedJoint.id === joint.id
                      ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/10"
                      : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">{joint.name}</span>
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        selectedJoint.id === joint.id
                          ? "bg-amber-700/50 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {joint.difficulty}
                    </span>
                  </div>
                  <span className={`text-[11px] mt-1 block line-clamp-1 leading-normal ${selectedJoint.id === joint.id ? "text-amber-100" : "text-slate-500"}`}>
                    {joint.description}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1.5 text-xs text-amber-950">
              <span className="font-extrabold text-[10px] uppercase text-amber-800 tracking-wider flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" /> SQA Assessment Tip
              </span>
              <p className="leading-relaxed">
                You must achieve a tolerance of <span className="font-bold">&plusmn;1.0mm</span> on your joint shoulders and flush faces in the SQA exam to earn maximum marks.
              </p>
            </div>
          </div>

          {/* Interactive 3D Model Display Stage */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Interactive 3D Simulation</span>
                  <h4 className="text-lg font-black text-slate-900">{selectedJoint.name} Model</h4>
                </div>
                
                {/* Visual Indicators for current assembly stage */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Process Phase:</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    {activeStepIdx === 0 ? "Marking" : activeStepIdx === 1 ? "Sawing" : activeStepIdx === 2 ? "Shaping" : "Assembled"}
                  </span>
                </div>
              </div>

              {/* 3D Render Area using raw isometric SVG polygons */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
                
                <svg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full max-w-[450px] select-none"
                  style={{ cursor: isDragging ? (dragMode === "rotate" ? "grabbing" : "move") : "grab" }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Grid layout indicators */}
                  <g stroke="rgba(0,0,0,0.02)" strokeWidth="1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line key={i} x1="0" y1={i * 30} x2={width} y2={i * 30} />
                    ))}
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line key={i} x1={i * 30} y1="0" x2={i * 30} y2={height} />
                    ))}
                  </g>

                  {/* Render simulated 3D faces using Painter's Algorithm sorting (based on depth Z) */}
                  {(() => {
                    const rawFaces = getJointFaces(selectedJoint.id, activeStepIdx, explodeFactor);
                    
                    // project points to 2D screen coordinates
                    const projected = rawFaces.map(face => {
                      const projPts = face.points.map(pt => 
                        project(pt, yaw, pitch, scale, width, height, offsetX, offsetY)
                      );
                      // Calculate average Z for painter sorting
                      const avgZ = projPts.reduce((acc, p) => acc + p.z, 0) / projPts.length;
                      return {
                        ...face,
                        screenPoints: projPts,
                        avgZ
                      };
                    });

                    // Sort faces so further ones render first
                    const sorted = projected.sort((a, b) => a.avgZ - b.avgZ);

                    return sorted.map((face, index) => {
                      // format path points
                      const d = face.screenPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
                      
                      if (face.isMarkingLine) {
                        return (
                          <path
                            key={index}
                            d={d}
                            stroke={face.color}
                            strokeWidth="2.5"
                            strokeDasharray="1 1"
                            fill="none"
                            id={`marking-line-${index}`}
                          />
                        );
                      }

                      if (face.isSawLine) {
                        return (
                          <path
                            key={index}
                            d={d}
                            stroke={face.color}
                            strokeWidth="3.5"
                            strokeDasharray="4 4"
                            fill="none"
                            className="animate-pulse"
                            id={`saw-line-${index}`}
                          />
                        );
                      }

                      // Apply standard normal shading based on simple vector
                      // top-right-front light source
                      // We can approximate a simple light factor depending on face index to make it extremely responsive and rapid
                      let shadeColor = face.color;
                      // Give different faces of the cube slightly varied shades for 3D realism
                      if (index % 6 === 1) { // side face
                        shadeColor = adjustBrightness(face.color, -15);
                      } else if (index % 6 === 2) { // left face
                        shadeColor = adjustBrightness(face.color, -25);
                      } else if (index % 6 === 4) { // top face
                        shadeColor = adjustBrightness(face.color, 12);
                      } else if (index % 6 === 5) { // bottom face
                        shadeColor = adjustBrightness(face.color, -35);
                      }

                      return (
                        <path
                          key={index}
                          d={d}
                          fill={shadeColor}
                          stroke={face.outlineColor}
                          strokeWidth="1"
                          id={`wood-face-${index}`}
                        />
                      );
                    });
                  })()}
                </svg>

                {/* Compass/Instruction guide indicator overlays */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-700 space-y-1.5 shadow-sm max-w-[280px]">
                  <div className="flex items-center gap-1.5 justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <span className="font-bold text-slate-950">3D Interactive Controls</span>
                    </div>
                    {(offsetX !== 0 || offsetY !== 0 || yaw !== 35 || pitch !== 20 || explodeFactor !== 0) && (
                      <button
                        onClick={resetView}
                        className="ml-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border border-amber-200 transition-colors uppercase tracking-wider cursor-pointer shadow-2xs"
                        title="Reset 3D View and Center Position"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 text-slate-600 font-medium text-[10.5px]">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-600 font-bold">• Drag:</span>
                      <span>Separate/Explode parts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-600 font-bold">• Shift + Drag:</span>
                      <span>Rotate in 3D space</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[11px] font-bold text-slate-400">
                  <span>Part A (Softwood)</span>
                  <span>Part B (Hardwood/Accent)</span>
                </div>
              </div>

              {/* Sliders for Interactive Rotation & Assembly Explode */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-slate-500" /> Orbit Yaw</span>
                    <span className="text-slate-500 font-mono">{yaw}&deg;</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={yaw}
                    onChange={(e) => setYaw(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-slate-500" /> Orbit Pitch</span>
                    <span className="text-slate-500 font-mono">{pitch}&deg;</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={pitch}
                    onChange={(e) => setPitch(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-slate-500" /> Joint Fit / Explode</span>
                    <span className="text-amber-600 font-mono">{explodeFactor}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={explodeFactor}
                    onChange={(e) => setExplodeFactor(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
              </div>

              {/* Step by step Manufacturing guide underneath */}
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ScrollText className="w-4 h-4 text-amber-600" /> 
                    SQA Sequential Benchmarks
                  </h4>
                  <span className="text-xs text-slate-400 font-semibold">
                    Step {activeStepIdx + 1} of {selectedJoint.steps.length}
                  </span>
                </div>

                {/* Timeline Step Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {selectedJoint.steps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveStepIdx(idx);
                        // Automatically adjust explode factor depending on the step
                        // (explode joint at early stages, clamp shut at assembly!)
                        if (idx === 3) { setExplodeFactor(0); }
                        else { setExplodeFactor(35); }
                      }}
                      className={`py-2 px-1 text-center font-bold text-[10px] uppercase rounded-lg border transition-all ${
                        activeStepIdx === idx
                          ? "bg-amber-600 border-amber-600 text-white shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Step {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Step Details block */}
                <div className="bg-amber-50/40 border border-amber-200/60 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-xs font-black text-amber-900">
                      Phase {activeStepIdx + 1}: {selectedJoint.steps[activeStepIdx].title}
                    </span>
                    <span className="bg-amber-200 text-amber-900 font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded">
                      TOOL: {selectedJoint.steps[activeStepIdx].toolUsed}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedJoint.steps[activeStepIdx].description}
                  </p>

                  <div className="border-t border-amber-200/50 pt-2.5 flex items-start gap-1.5 text-[11px] text-amber-950 font-semibold leading-normal">
                    <Info className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-amber-900">Teacher's Quality Tip:</strong> {selectedJoint.steps[activeStepIdx].tips}
                    </span>
                  </div>
                </div>

                {/* Gemini Pro AI Joint Advisor Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                      Gemini Pro Joint Advisor
                    </h4>
                    <span className="bg-blue-100 text-blue-800 font-mono font-bold text-[8px] uppercase px-2 py-0.5 rounded animate-pulse">
                      AI Live Help
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-normal">
                    Get custom 3D model advice or SQA sequence parameters for the <strong className="text-slate-900">{selectedJoint.name}</strong> from Gemini Pro.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Ask about angles, sizes, tools or 3D coordinate logic..."
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs w-full focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                    <button
                      onClick={fetchAiAdvice}
                      disabled={isGenerating}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-[11px] px-3 py-2 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1"
                    >
                      {isGenerating ? "Analyzing..." : "Ask AI"}
                    </button>
                  </div>

                  {aiAdvice && (
                    <div className="bg-white border border-blue-100 rounded-xl p-4 mt-2 max-h-[250px] overflow-y-auto text-xs text-slate-700 space-y-2 scrollbar-thin">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-1.5">
                        <span className="font-bold text-[9px] uppercase text-blue-600 tracking-wider">AI Instructor Response:</span>
                        <button 
                          onClick={() => setAiAdvice("")} 
                          className="text-slate-400 hover:text-slate-600 text-[10px]"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="whitespace-pre-line leading-relaxed font-semibold">
                        {aiAdvice}
                      </div>
                    </div>
                  )}
                  {aiError && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs leading-normal">
                      {aiError}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* RENDER TAB 2: WORKING DRAWINGS & ORTHOGRAPHICS */}
      {activeTab === "drawings" && (
        <div className="space-y-8">
          
          {/* Third Angle Projection Explanation Banner */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase px-2 py-1 rounded">
                Technical Graphics Tutorial
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Understanding Third Angle Projection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In Scotland, all woodwork working drawings use the **Third Angle Projection** system. This system places views logically relative to how you look at the physical product:
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 bg-blue-100 text-blue-700 font-mono font-bold text-[10px] rounded flex items-center justify-center shrink-0 mt-0.5">P</div>
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Plan View:</strong> A bird's-eye view looking straight down. Positioned at the TOP of the page.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 bg-blue-100 text-blue-700 font-mono font-bold text-[10px] rounded flex items-center justify-center shrink-0 mt-0.5">F</div>
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Front Elevation:</strong> The main front view of the object. Positioned directly BELOW the Plan.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 bg-blue-100 text-blue-700 font-mono font-bold text-[10px] rounded flex items-center justify-center shrink-0 mt-0.5">E</div>
                  <p className="text-slate-700">
                    <strong className="text-slate-900">End Elevation:</strong> The side profile view. Positioned to the LEFT or RIGHT of the Front, aligning horizontally.
                  </p>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 text-rose-950 p-4 rounded-xl text-xs space-y-1">
                <span className="font-extrabold text-[10px] text-rose-700 uppercase block tracking-wider">CRITICAL RULE FOR ALL EXAMS:</span>
                <p>
                  All sizes and measurements in woodworking blueprints must **ALWAYS be written in millimeters (mm)**. Never write 'cm' or 'meters' on your SQA papers!
                </p>
              </div>
            </div>

            {/* Visual Projection Alignment Stage */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Orthographic Blueprint Projection Alignments</span>
                
                {/* Visual Representation of third angle alignment box */}
                <div className="border border-slate-200 bg-white rounded-xl p-4 grid grid-cols-2 gap-4 text-center">
                  
                  {/* Top: Plan view slot */}
                  <div className="col-span-2 border-2 border-dashed border-slate-200 rounded-lg p-3 bg-slate-50/50">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 font-bold block mb-1">PLAN VIEW (Looking Down)</span>
                    <div className="w-32 h-14 bg-amber-100/40 border border-amber-300 mx-auto rounded flex items-center justify-center text-xs font-mono font-bold text-slate-700">
                      Length: 120 mm <br/> Width: 40 mm
                    </div>
                  </div>

                  {/* Bottom Left: Front view slot */}
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-3 bg-slate-50/50">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 font-bold block mb-1">FRONT ELEVATION</span>
                    <div className="w-full h-14 bg-amber-100/40 border border-amber-300 rounded flex items-center justify-center text-xs font-mono font-bold text-slate-700">
                      L: 120 mm / H: 20 mm
                    </div>
                  </div>

                  {/* Bottom Right: End Elevation view slot */}
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-3 bg-slate-50/50">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 font-bold block mb-1">END ELEVATION</span>
                    <div className="w-full h-14 bg-amber-100/40 border border-amber-300 rounded flex items-center justify-center text-xs font-mono font-bold text-slate-700">
                      W: 40 mm / H: 20 mm
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-blue-50/60 text-blue-950 p-3 rounded-xl border border-blue-100 flex gap-2 items-center text-xs mt-4">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p>
                  Notice how the dimensions coordinate: The **length (120mm)** matches perfectly between the Plan and Front. The **width (40mm)** matches between Plan and End.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Understanding Questions */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div>
              <h4 className="text-md font-black text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-5 h-5 text-blue-600" /> Orthographic Benchmark Challenge
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Answer these questions to demonstrate you can read standard SQA orthographics accurately.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {orthographicQuestions.map((q, idx) => {
                const isAnswered = selectedQAnswers[idx] !== undefined;
                const answeredIdx = selectedQAnswers[idx];

                return (
                  <div key={q.id} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/30 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Question 0{idx+1}</span>
                      <p className="text-xs font-black text-slate-900 leading-normal">{q.question}</p>
                      
                      <div className="space-y-1.5 pt-1">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
                          if (isAnswered) {
                            if (optIdx === q.correctIndex) {
                              optStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                            } else if (answeredIdx === optIdx) {
                              optStyle = "border-rose-300 bg-rose-50 text-rose-950";
                            } else {
                              optStyle = "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isAnswered}
                              onClick={() => handleSelectAnswer(idx, optIdx)}
                              className={`w-full text-left p-2.5 rounded-lg border text-[11px] font-semibold transition-all ${optStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {showQFeedback[idx] && (
                      <div className="mt-4 bg-white border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 leading-normal">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* RENDER TAB 3: PROJECTS ROADMAP & COURSEWORK */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs text-center space-y-4 max-w-3xl mx-auto py-12">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto border border-amber-200">
              <Hammer className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Workshop Projects Desk
              </h3>
              <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                This area acts as a placeholder for upcoming curricular projects. Soon, you will be able to construct interactive digital assembly guides for National 5 wooden clocks, key holders, and storage stools!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">N5 Task</span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">S5 Wall Clock</h4>
                <p className="text-[11px] text-slate-500 mt-1">Requires stopped housing joints, bevel edge chisels, and final wax finish.</p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                <span className="text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 px-2 py-0.5 rounded">Higher Task</span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Dovetailed Storage Box</h4>
                <p className="text-[11px] text-slate-500 mt-1">Focuses on high-precision hand-cut single dovetail corners and brass hinge alignments.</p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">BGE Task</span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Key Rack Organizer</h4>
                <p className="text-[11px] text-slate-500 mt-1">Perfect introductory project focusing on corner lap joints and simple try square markings.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER TAB 4: SQA LOGBOOK & THEORY ASSIGNMENTS */}
      {activeTab === "logbook" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* N5 Logbook Section Info */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2 py-1 rounded">
              Curriculum Standard Portfolio
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-1.5">
              <ClipboardList className="w-5.5 h-5.5 text-amber-600" />
              Completing the SQA Logbook
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To achieve full marks in the Practical Woodworking assignment, you must complete your workbook logbook. The SQA markers look for deep analysis across these 3 sections:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-3.5 space-y-1">
                <h4 className="text-xs font-bold text-slate-900">1. Preparation of Work</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  List all required workshop tools (tenon saws, chisels, rule, square). Create a sequence of manufacture. Outline necessary safety PPE (safety glasses, stout footwear, hair tied back).
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-3.5 space-y-1">
                <h4 className="text-xs font-bold text-slate-900">2. Record of Manufacture</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Write detailed weekly logs of what you achieved. Describe any mistakes (e.g. cutting on the wrong side of the line) and how you corrected them (e.g., gluing a pine spacer or truing the shoulder).
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-3.5 space-y-1">
                <h4 className="text-xs font-bold text-slate-900">3. Final Evaluation</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Measure your finished product dimensions against working drawing targets. Rate the tight fit of your woodwork joints and the final clear varnish or wax sanding quality.
                </p>
              </div>
            </div>
          </div>

          {/* SQA Written Theory Assignment (10 Marks Guide) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
            <div>
              <span className="bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                Exam Prep Strategy
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Cracking the 10-Mark Theory Assignment
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Learn how SQA markers evaluate written woodwork exam responses.</p>
            </div>

            <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-extrabold text-[10px] text-amber-800 uppercase tracking-wider block">Common Theory Question Types:</span>
                <p className="text-slate-700 leading-relaxed">
                  Written exams frequently ask you to **select an appropriate hand tool for a task** or **describe a manufacturing sequence** for a given joint. To secure full marks, use standard workshop nomenclature:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white border border-slate-200/60 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 text-[11px] block">Do NOT write generic terms:</span>
                  <p className="text-[10px] text-rose-600 line-through">"A saw", "A ruler", "Chisel", "Glue"</p>
                </div>
                <div className="bg-white border border-slate-200/60 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 text-[11px] block">DO write full BSI titles:</span>
                  <p className="text-[10px] text-emerald-600 font-bold">"Tenon Saw", "Steel Rule", "Bevel-Edged Chisel", "PVA Wood Glue"</p>
                </div>
              </div>

              <div className="border-t border-amber-200/50 pt-3 space-y-2">
                <span className="font-extrabold text-[10px] text-slate-500 uppercase tracking-widest block">Active Recall Theory Flashcards</span>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl hover:border-amber-400 cursor-pointer transition-colors">
                    <span className="font-bold text-[10px] text-slate-400 uppercase block">Q: Scots Pine classification?</span>
                    <span className="font-extrabold text-amber-900 text-[11px] block mt-1">Softwood (Conifer tree)</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-xl hover:border-amber-400 cursor-pointer transition-colors">
                    <span className="font-bold text-[10px] text-slate-400 uppercase block">Q: Marking parallel lines?</span>
                    <span className="font-extrabold text-amber-900 text-[11px] block mt-1">Marking Gauge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// Helper to adjust color hex brightness for realistic 3D face shading
function adjustBrightness(col: string, amt: number): string {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, "0");
}
