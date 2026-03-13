from docx import Document

def parse_docx(file_path: str):

    doc = Document(file_path)

    text = "\n".join(
        paragraph.text for paragraph in doc.paragraphs
    )

    return text