import React from 'react';
import { AddCircleIcon } from '../../../assets';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import  SFTPClient from 'ssh2-sftp-client';
import welcome from '../../../assets/welcome.png'
const PageInicioTutor = () => {
  /*const downloadFile = async () => {
    const sftp = new SFTPClient();
    const remoteFilePath = '/home/ubuntu/archivos/documento.txt';
    const localFilePath = 'downloads/prueba1.txt';

    try {
      await sftp.connect({
        host: 'ec2-3-218-128-38.compute-1.amazonaws.com',
        port: 22,
        username: 'ubuntu',
        privateKey: './nuevo.pem',
      });

      const fileContent = await sftp.get(remoteFilePath);
      await sftp.end();

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([fileContent]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'documento.txt'); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error descargando el archivo', err);
    }
  };*/
  return (
    <div className='flex flex-col items-center justify-center h-[100%]'>
      <div className='flex justify-center items-center h-4/5'>
        <img src={welcome} alt="welcome" className='max-h-full' />
      </div>
      <h1 className='mt-4 text-3xl font-bold'>
        ¡Hola! Bienvenido a MiTutor
      </h1>
      <p className='mt-2 text-lg text-center'>
        Para comenzar, haz click en una de las opciones del menú de la izquierda.
      </p>
    </div>
  );
};
//<button onClick={downloadFile}>Descargar Archivo</button>
    
export default PageInicioTutor;