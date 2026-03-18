from pptx import Presentation
from pptx.util import Inches

data = {
  "title": "Marketing Strategy for Startups",
  "sections": [
    {
      "sectionName": "Title Slide",
      "pages": [
        {
          "pageTitle": "Marketing Strategy for Startups",
          "content": [
            "Startup growth focus",
            "Strategic marketing foundation",
            "Clear value proposition",
            "Actionable growth tactics",
            "Outcome-driven mindset"
          ]
        }
      ]
    },
    {
      "sectionName": "Table of Contents",
      "pages": [
        {
          "pageTitle": "Agenda",
          "content": [
            "Understanding the market",
            "Defining target audience",
            "Positioning and messaging",
            "Channel selection",
            "Performance measurement",
            "Next steps"
          ]
        }
      ]
    },
    {
      "sectionName": "Introduction",
      "pages": [
        {
          "pageTitle": "Why Marketing Matters",
          "content": [
            "Drives customer acquisition",
            "Creates brand awareness",
            "Supports revenue goals",
            "Aligns team objectives",
            "Enables scalable growth"
          ]
        }
      ]
    },
    {
      "sectionName": "Methodology",
      "pages": [
        {
          "pageTitle": "Strategic Process",
          "content": [
            "Market research and analysis",
            "Competitive landscape mapping",
            "Audience segmentation",
            "Value proposition development",
            "Channel planning and execution",
            "Performance tracking"
          ]
        }
      ]
    },
    {
      "sectionName": "Main Content",
      "pages": [
        {
          "pageTitle": "Target Market Insight",
          "content": [
            "Identify high‑potential segments",
            "Analyze buyer personas",
            "Prioritize pain points",
            "Align offerings with needs",
            "Validate with real‑world data"
          ]
        },
        {
          "pageTitle": "Value Proposition Crafting",
          "content": [
            "State unique benefit clearly",
            "Focus on customer outcomes",
            "Differentiate from competitors",
            "Keep messaging concise",
            "Test resonance with audience"
          ]
        },
        {
          "pageTitle": "Channel Selection Strategy",
          "content": [
            "Choose platforms matching audience",
            "Leverage digital and offline mix",
            "Allocate budget by ROI potential",
            "Plan content calendar",
            "Optimize for each channel"
          ]
        },
        {
          "pageTitle": "Performance Measurement",
          "content": [
            "Define key metrics",
            "Track acquisition cost",
            "Monitor engagement levels",
            "Adjust tactics based on data",
            "Report results regularly"
          ]
        }
      ]
    },
    {
      "sectionName": "Conclusion",
      "pages": [
        {
          "pageTitle": "Key Takeaways",
          "content": [
            "Strategic marketing fuels growth",
            "Customer focus drives differentiation",
            "Data informs continuous improvement",
            "Execution aligns with vision",
            "Start small, scale fast"
          ]
        }
      ]
    },
    {
      "sectionName": "References",
      "pages": [
        {
          "pageTitle": "Sources",
          "content": [
            "Kotler on Marketing",
            "Growth Hacker Playbook",
            "Harvard Business Review Articles",
            "Startup Methodology Guides",
            "Industry Benchmark Reports"
          ]
        }
      ]
    }
  ]
}

def create_ppt(data):

    prs = Presentation()
    pg = 1

    # Title slide 
    slide_layout = prs.slide_layouts[5]
    slide = prs.slides.add_slide(slide_layout)
    slide.shapes.title.text = data["title"]

    # Remaining slides
    for section in data["sections"]:

        if section["sectionName"] == "Title Slide":
            continue

        for page in section["pages"]:

            slide_layout = prs.slide_layouts[1]
            slide = prs.slides.add_slide(slide_layout)

            # Title
            slide.shapes.title.text = page["pageTitle"]

            # Content
            content_box = slide.placeholders[1]
            tf = content_box.text_frame

            for i, bullet in enumerate(page["content"]):
                if i == 0:
                    tf.text = bullet
                else:
                    p = tf.add_paragraph()
                    p.text = bullet

    prs.save("output.pptx")

        
create_ppt(data)