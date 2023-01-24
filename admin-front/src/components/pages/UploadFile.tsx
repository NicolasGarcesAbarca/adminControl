import { Flex, Center, Text } from "@chakra-ui/react"
import axios from "axios"
import React,{useState} from "react"

export function UploadFilePage() {
    const [file, setFile] = React.useState<File[] | null>(null)
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            console.log("event.target.files")
            console.log(event.target.files)
            setFile(Array.from(event.target.files))
            try {
                const selectedFile = event.target.files[0];
                const url = 'http://127.0.0.1:5001/remind23451/us-central1/api/uploadit'
                // const url = 'http://127.0.0.1:8000'
                var formData = new FormData();
                formData.append("dandre", selectedFile,selectedFile.name);
                // const dd={"dandre": selectedFile}
                // const config = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     }
                // }
                const response = await axios.post(url, formData);
                console.log("response")
                console.log(response)

            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('no files')
        }
    }
    return (
        <Flex width='100%' h='600px' border={'2px solid black'} justify={'center'}>
            <Center width='100%' bg='green.100'>
                {/* <form action="http://127.0.0.1:5001/remind23451/us-central1/api/uploadit" method="post" encType="multipart/form-data">
                    <input type="file" name="avatar" />
                    <input type="submit" value="Upload" />
                </form> */}
                <List files={file} />
                <Text>Upload File</Text>
                <input type="file" multiple name="avatar" onChange={async e => { await handleChange(e) }} />
            </Center>
        </Flex>
    )
}

const List=({files}:{files:File[]|null})=>{
    if (!files) return <p>nadda</p>
    return (
        <ul>
            {files.map((file) => (
                <li key={file.name}>{file.name}</li>
            ))}
        </ul>
    )
}