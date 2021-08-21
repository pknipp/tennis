    # commented out from slacked instructions
# import botocore
# import os

import boto3
from .config import Config

s3 = boto3.client(
    "s3",
    aws_access_key_id=Config.S3_KEY,  # or = os.environ.get("S3_KEY"),?
    aws_secret_access_key=Config.S3_SECRET # or = os.environ.get("S3_SECRET")?
)
# commented out from petstagram: boto3.set_stream_logger("botocore", level="DEBUG")

# imported from slacked reference:
# import uuid

# ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

# def allowed_file(filename):
#     return "." in filename and \
#            filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# def get_unique_filename(filename):
#     ext = filename.rsplit(".", 1)[1].lower()
#     unique_filename = uuid.uuid4().hex
#     return f"{unique_filename}.{ext}"

## KNIPP comment: instead base filename upon user.name (which is unique)

# uploaded from slacked instructions
# BUCKET_NAME = os.environ.get("S3_BUCKET")
# S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

# def upload_file_to_s3(file, acl="public-read"):
#     try:
#         s3.upload_fileobj(
#             file,
#             BUCKET_NAME,
#             file.filename,
#             ExtraArgs={
#                 "ACL": acl,
#                 "ContentType": file.content_type
#             }
#         )
#     except Exception as e:
#         # in case the our s3 upload fails
#         return {"errors": str(e)}

#     return {"url": f"{S3_LOCATION}{file.filename}"}

def upload_file(file_name, bucket, acl="public-read"):
    """
    Function to upload a file to an S3 bucket
    """
    object_name = file_name
    # s3_client = boto3.client('s3')
    response = s3.upload_file(file_name, bucket, object_name, ExtraArgs={
        "ACL": acl,
    })

    return response


def download_file(file_name, bucket):
    """
    Function to download a given file from an S3 bucket
    """
    # s3 = boto3.resource('s3')
    output = f"downloads/{file_name}"
    s3.Bucket(bucket).download_file(file_name, output)

    return output


def list_files(bucket):
    """
    Function to list files in a given S3 bucket
    """
    s3 = boto3.client('s3')
    contents = []
    for item in s3.list_objects(Bucket=bucket)['Contents']:
        contents.append(item)

    return contents
