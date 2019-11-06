export const abiRSK = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "afiliacion",
				"type": "string"
			},
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "descripcioncert",
				"type": "string"
			},
			{
				"name": "certificador",
				"type": "string"
			},
			{
				"name": "entidad",
				"type": "string"
			}
		],
		"name": "generateHashVal",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "afiliacion",
				"type": "string"
			},
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "descripcioncert",
				"type": "string"
			},
			{
				"name": "certificador",
				"type": "string"
			},
			{
				"name": "entidad",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]