"use client";

import React, { useState } from "react";
import CryptoJS from "crypto-js";

interface ClientComponentProps {}

export const JsonToHash: React.FC<ClientComponentProps> = ({}) => {
  const [payload, setPayload] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [calculatedHash, setCalculatedHash] = useState("");

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(calculatedHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPayload(e.target.value);
  };
  const handleSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSecretKey(e.target.value);

  const hashPayload = () => {
    try {
      const payloadString = JSON.stringify(JSON.parse(payload));
      const hash = CryptoJS.HmacSHA256(payloadString, secretKey).toString();
      setCalculatedHash(hash);
    } catch {
      alert("Your json is not valid");
    }
  };

  return (
    <div className="flex flex-col items-center mb-4 h-screen my-20 w-[60%] px-10 gap-4">
      <p className="font-bold text-xl text-center mb-5">
        CONVERT RAW JSON TO SHA-256 hash with secret key
      </p>
      <div className="w-full">
        <div className="mb-4">
          <label htmlFor="secretKey" className="mb-2">
            Secret Key:
          </label>
          <input
            id="secretKey"
            type="text"
            value={secretKey}
            onChange={handleSecretKeyChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="w-full">
          <label htmlFor="payload" className="mb-2">
            JSON Payload:
          </label>
          <textarea
            id="payload"
            rows={10}
            value={payload}
            onChange={handlePayloadChange}
            className="w-full border border-gray-300 rounded p-2 text-black"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={hashPayload}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            !payload || !secretKey ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!payload || !secretKey}
        >
          Calculate Hash
        </button>
      </div>
      <div className="w-full text-left">
        <p className="font-bold text-2xl mb-4">Output:</p>
        <div className="relative border-2 min-h-10 rounded-sm p-4">
          <code>{calculatedHash}</code>
          <button
            onClick={handleCopy}
            className={`text-sm absolute top-0 right-0 p-1 bg-gray-200 hover:bg-gray-300 rounded-sm ${
              copied ? "bg-green-200" : ""
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};
