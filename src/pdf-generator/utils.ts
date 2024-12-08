function hexToUint8Array(hex: string): Uint8Array {
  const length = hex.length / 2;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
      uint8Array[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return uint8Array;
}

export function savePDF(hexString: string, fileName: string): void {
  // Convert hex string to binary data
  const binaryData = hexToUint8Array(hexString);

  // Create a Blob from the binary data
  const blob = new Blob([binaryData], { type: 'application/pdf' });

  // Create a URL for the Blob and download it
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}