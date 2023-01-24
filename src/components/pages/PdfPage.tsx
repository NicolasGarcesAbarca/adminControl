import { jsPDF } from "jspdf";
import { Flex,Button } from '@chakra-ui/react';


const handleClick = () => ()=>{
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
}
export function PdfPage() {
    return (
        <Flex
            direction={'column'}
            w={'100%'}
            bg={'teal.500'}
            p={12}
        >
            <Button onClick={handleClick()}>pdf please</Button>
        </Flex>
    )
}