import { useSelector } from "react-redux";
import './leaderboard.css'
function LeaderBoard() {

let {scores,isPending,isError,errorMessage}=useSelector(state=>state.scores)

    return ( 
        <div className="tab">
            <table className="table table-striped ">
<thead>
      <tr>
        <th rowSpan={2}className='pos-sti' ><div className='pos-sti'>Username(Rank)</div></th>
        <th colSpan={3}  className='text-center'>Leetcode</th>
        <th colSpan={3} className='text-center'>CodeChef</th>
        <th colSpan={3} className='text-center'>CodeForces</th>
          <th colSpan={2} className='text-center'>Spoj</th>
        <th rowSpan={2}>Total Score</th>
      </tr>
      <tr>
        {/* Leetcode */}
        <th>No Of Problems Solved</th>
        <th>Rating</th>
        <th>Total Score</th>
        {/* Code Chef */}
        <th>No Of Problems Solved</th>
        <th>Rating</th>
        <th>Total Score</th>
        {/* Code Forces */}
        <th>No Of Problems Solved</th>
        <th>Rating</th>
        <th>Total Score</th>
        {/*Spoj */}
         <th>No Of Problems Solved</th>
        <th>Total Score</th>
      </tr>
    </thead>
    <tbody>
            {
                scores.map((ele,idx)=> <tr key={idx}>
                    <td style={{fontWeight:'bolder'}} className='pos-sti'>{ ele.username+' ( '+(idx+1)+" )" }</td>
                    <td>{ele.lc.noOfProblemsSolved}</td>
                    <td>{ele.lc.rating}</td>
                    <td>{ele.lcScore}</td>
                    <td>{ele.cc.noOfProblemsSolved}</td>
                    <td>{ele.cc.rating}</td>
                    <td>{ele.ccScore}</td>
                    <td>{ele.cf.noOfProblemsSolved}</td>
                    <td>{ele.cf.rating}</td>
                    <td>{ele.cfScore}</td>
                    <td>{ele.spoj.noOfProblemsSolved}</td>
                    <td>{ele.spojScore}</td>
                    <td>{ele.score }</td>
                </tr> )
            }
</tbody>
        </table>
        </div>
     );
}

export default LeaderBoard;