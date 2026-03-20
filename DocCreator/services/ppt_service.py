from pptx import Presentation
from pptx.util import Inches

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