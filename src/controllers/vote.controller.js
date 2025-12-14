import mongoose from "mongoose";
import vote from "../models/vote.model.js";
import { productModel } from "../models/products.models.js";




export const addVote = async (req, res) =>{
    try {
        const userId = req.params.id
        const { productId } = req.body;

        console.log(productId)
        
        // if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

        const product = await productModel.findById(productId);
        if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

        const existingVote = await vote.findOne ({user : userId});
        if(existingVote){
            return res.status(400).json({msg: "Ya has votado!!"})
        }


        const newVote = new vote({ user : userId , product : productId});
        console.log('id : ', userId)

        await newVote.save();


        await productModel.findByIdAndUpdate(productId, {$inc: {votes: 1}});

        res.status(201).json({msg: "Voto registrado con exito"});

    } catch (error) {
        console.log(error);
        res.status(500).json ({msg: "Ya vostaste "})
    }
};

export const getVotesByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const votesList = await vote.find({ product: productId })
            .populate("user", "name email")
            .populate("product", "name image");

        res.status(200).json({
            ok: true,
            votes: votesList,
            total: votesList.length
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error al obtener los votos" });
    }

    
};
export const getAllVotes = async (req, res) => {
  try {
    const votes = await vote
      .find()
      .populate("user", "name email")
      .populate("product", "name");

    res.status(200).json({ votes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener todos los votos" });
  }
};

export const getVotesRanking = async (req, res) => {
  try {
    const ranking = await vote.aggregate([
      {
        $group: {
          _id: "$product",
          totalVotes: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          name: "$product.name",
          image: "$product.image",
          totalVotes: 1
        }
      },
      { $sort: { totalVotes: -1 } }
    ]);

    res.status(200).json({ ok: true, ranking });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener el ranking" });
  }
};

export const getVotesRankingByOwner = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    // Obtener todos los productos del owner
    const ownerProducts = await productModel.find({ userId }).select('_id name image votes');

    // Formatear la respuesta
    const ranking = ownerProducts.map(product => ({
      productId: product._id,
      name: product.name,
      image: product.image,
      totalVotes: product.votes || 0
    }));

    // Ordenar por votos de mayor a menor
    ranking.sort((a, b) => b.totalVotes - a.totalVotes);

    res.status(200).json({ ok: true, ranking });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener el ranking del owner" });
  }
};






export const getVoteCount = async (req, res) => {
    try {
        const { productId } = req.params;
        const count = await vote.countDocuments({ product: productId });

        res.status(200).json({ productId, totalVotes: count });
    } catch (error) {
        res.status(500).json({ msg: "error al contar los votos" });
    }
};


export const add = async (req, res) =>{
    
};




