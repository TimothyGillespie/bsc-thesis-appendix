import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {HttpClient} from "@angular/common/http";
import {ApiQueryService, ProveRequest, ProveResponse} from "../../services/api-query/api-query.service";
import {LoadingScreenService} from "../../services/loading-screen/loading-screen.service";
import convertKeysToCamelCase from "../../../util/convertKeysToCamelCase";
import toClipBoard from "../../../util/toClipBoard";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  @ViewChild("requestDisplay") requestDisplay: HTMLTextAreaElement;

  constructor(
    private requestData: RequestDataService,
    private api: ApiQueryService,
    private loadingScreen: LoadingScreenService,
    private messageService: MessageService,
  ) { }

  names: string[] = [
    'Function Definitions',
    'Inductive Hypothesis',
    'Additional Constraints',
    'Inductive Basis',
    'Inductive Step',
  ]

  result: ProveResponse;
  error: boolean = false;
  sentRequest?: ProveRequest = null;

  ngOnInit(): void {
    this.loadingScreen.start();

    const request = this.requestData.obtainRequest();
    // const request = convertKeysToCamelCase({
    //   "constructor_definitions": [
    //     {
    //       "term": "nt",
    //       "type": "NAryTree",
    //       "functions": [
    //         {
    //           "symbol": "t_base",
    //           "arity": 0
    //         },
    //         {
    //           "symbol": "t",
    //           "arity": 2
    //         }
    //       ]
    //     }
    //   ],
    //   "statement_tree": {
    //     "symbol": "<=",
    //     "parameters": [
    //       {
    //         "symbol": "depth",
    //         "parameters": [
    //           {
    //             "symbol": "nt",
    //             "parameters": []
    //           }
    //         ]
    //       },
    //       {
    //         "symbol": "size",
    //         "parameters": [
    //           {
    //             "symbol": "nt",
    //             "parameters": []
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   "function_definitions": [
    //     {
    //       "name": "depth",
    //       "arity": 1,
    //       "input_types": [
    //         "NAryTree"
    //       ],
    //       "output_type": "Int",
    //       "definition": [
    //         {
    //           "input_constructor": {
    //             "name": "t",
    //             "arity": 2,
    //             "bound_variables": [
    //               "u",
    //               "v"
    //             ]
    //           },
    //           "conditional": [
    //             {
    //               "condition": {
    //                 "symbol": ">",
    //                 "parameters": [
    //                   {
    //                     "symbol": "depth",
    //                     "parameters": [
    //                       {
    //                         "symbol": "u",
    //                         "parameters": []
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     "symbol": "depth",
    //                     "parameters": [
    //                       {
    //                         "symbol": "v",
    //                         "parameters": []
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               },
    //               "then": {
    //                 "symbol": "depth",
    //                 "parameters": [
    //                   {
    //                     "symbol": "u",
    //                     "parameters": []
    //                   }
    //                 ]
    //               }
    //             }
    //           ],
    //           "otherwise": {
    //             "symbol": "depth",
    //             "parameters": [
    //               {
    //                 "symbol": "v",
    //                 "parameters": []
    //               }
    //             ]
    //           }
    //         },
    //         {
    //           "input_constructor": {
    //             "name": "t_base",
    //             "arity": 0,
    //             "bound_variables": []
    //           },
    //           "conditional": [],
    //           "otherwise": {
    //             "symbol": 1,
    //             "parameters": []
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "name": "size",
    //       "arity": 1,
    //       "input_types": [
    //         "NAryTree"
    //       ],
    //       "output_type": "Int",
    //       "definition": [
    //         {
    //           "input_constructor": {
    //             "name": "t",
    //             "arity": 2,
    //             "bound_variables": [
    //               "x",
    //               "y"
    //             ]
    //           },
    //           "conditional": [],
    //           "otherwise": {
    //             "symbol": "+",
    //             "parameters": [
    //               {
    //                 "symbol": "1",
    //                 "parameters": []
    //               },
    //               {
    //                 "symbol": "+",
    //                 "parameters": [
    //                   {
    //                     "symbol": "size",
    //                     "parameters": [
    //                       {
    //                         "symbol": "x",
    //                         "parameters": []
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     "symbol": "size",
    //                     "parameters": [
    //                       {
    //                         "symbol": "y",
    //                         "parameters": []
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         },
    //         {
    //           "input_constructor": {
    //             "name": "t_base",
    //             "arity": 0,
    //             "bound_variables": []
    //           },
    //           "conditional": [],
    //           "otherwise": {
    //             "symbol": 1,
    //             "parameters": []
    //           }
    //         }
    //       ]
    //     }
    //   ],
    //   "additional_constraints": [
    //   ]
    // })
    this.sentRequest = request
    this.api.prove(request).then((response) => {
        this.result = response;
    }).catch((error) => {
      error = true
    });


    this.loadingScreen.stop();
  }

  getResponseKeys() {
    return Object.keys(this.result.satisfiability)
  }

  printHumanReadable(): string {
    let text = this.result.counterModel?.humanReadable.typing
    text += "\n\n"
    text += this.result.counterModel?.humanReadable.constantDefinitions.replace("()", "")
    text += "\n\n"
    text += this.result.counterModel?.humanReadable.functionDefinitions.reduce((previousText, nextText) => previousText + "\n\n" + nextText.replace("()", ""))

    return text
  }

  copyRequest() {
    toClipBoard(JSON.stringify(this.sentRequest, null, "\t"))
    this.messageService.add({
      severity: 'success',
      summary:'Success',
      detail: 'The sent request was successfully copied to your clipboard!'
    })
  }
}
