from pptx import Presentation
from pptx.util import Inches


def create_ppt(data):

    prs = Presentation()

    for section in data["sections"]:
        for page in section["pages"]:

            # Create slide
            slide = prs.slides.add_slide(prs.slide_layouts[1])

            # Set title
            slide.shapes.title.text = page["pageTitle"]

            # Add content
            text_frame = slide.placeholders[1].text_frame
            text_frame.clear()

            for i, item in enumerate(page["content"]):
                if i == 0:
                    text_frame.text = item
                else:
                    p = text_frame.add_paragraph()
                    p.text = item
                    p.level = 0

            # Add page number (bottom-right)
            left = prs.slide_width - Inches(1)
            top = prs.slide_height - Inches(0.5)

            textbox = slide.shapes.add_textbox(left, top, Inches(1), Inches(0.5))
            textbox.text_frame.text = str(page["pageNo"])

    prs.save("output.pptx")