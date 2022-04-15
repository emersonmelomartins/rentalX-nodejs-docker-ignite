import fs from 'fs';

export const deleteFile = async (filename: string) => {
  // verifica se arquivo existe
  try {
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }

  // apaga arquivo
  await fs.promises.unlink(filename);
};
