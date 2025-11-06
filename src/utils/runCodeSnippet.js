import axios from "axios";

export const handleRunCode = async (code, codeLanguage) => {
    // const [output, setOutput] = useState('');
    console.log(codeLanguage);
    try {
      const res = await axios.post("http://localhost:4000/api/code/run", {
        language: codeLanguage,
        code: code,
      });
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("Error: " + err.message);
    }
}