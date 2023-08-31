   # for file in data['files']:
    #     fileUrl = 'http://localhost:5000/api/v1/auth/file/'+file['_id']
    #     fileName = file['rollno']+'.jpg'
    #     fileRes = requests.get(fileUrl)
    #     image = Image.open(BytesIO(fileRes.content))
    #     os.makedirs(output_dir, exist_ok=True)
    #     output_path = os.path.join(output_dir, fileName)
    #     image.save(output_path)