from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
import os
import uuid

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def create_ppt(data):

    prs = Presentation()

    # Define colors
    TITLE_COLOR = RGBColor(0, 102, 204)     # Blue
    TEXT_COLOR = RGBColor(50, 50, 50)       # Dark gray

    # ------------------- TITLE SLIDE -------------------
    slide_layout = prs.slide_layouts[0]  # better title layout
    slide = prs.slides.add_slide(slide_layout)

    title = slide.shapes.title
    subtitle = slide.placeholders[1]

    title.text = data["title"]
    subtitle.text = "Generated Presentation"

    # Style title
    title_tf = title.text_frame
    title_run = title_tf.paragraphs[0].runs[0]
    title_run.font.size = Pt(40)
    title_run.font.bold = True
    title_run.font.color.rgb = TITLE_COLOR

    # ------------------- CONTENT SLIDES -------------------
    for section in data["sections"]:

        if section["sectionName"] == "Title Slide":
            continue

        for page in section["pages"]:

            slide_layout = prs.slide_layouts[1]
            slide = prs.slides.add_slide(slide_layout)

            # TITLE
            title = slide.shapes.title
            title.text = page["pageTitle"]

            title_tf = title.text_frame
            title_run = title_tf.paragraphs[0].runs[0]
            title_run.font.size = Pt(30)
            title_run.font.bold = True
            title_run.font.color.rgb = TITLE_COLOR

            # CONTENT BOX
            content_box = slide.placeholders[1]
            tf = content_box.text_frame
            tf.clear()

            for i, bullet in enumerate(page["content"]):

                if i == 0:
                    p = tf.paragraphs[0]
                else:
                    p = tf.add_paragraph()

                p.text = bullet
                p.level = 0
                p.font.size = Pt(20)
                p.font.color.rgb = TEXT_COLOR
                p.font.name = "Calibri"

                # alignment
                p.alignment = PP_ALIGN.LEFT

    file_name = f"{uuid.uuid4()}.pptx"
    output_path = os.path.abspath(
        os.path.join(BASE_DIR, "..", "generated_files", file_name)
    )

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    prs.save(output_path)