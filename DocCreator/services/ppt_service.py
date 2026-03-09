from pptx import Presentation

def create_ppt(data):

    prs = Presentation()

    slide = prs.slides.add_slide(prs.slide_layouts[0])
    slide.shapes.title.text = data.title

    file_path = "generated_files/output.pptx"

    prs.save(file_path)

    return {"file": file_path}